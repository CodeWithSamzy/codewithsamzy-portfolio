import { test, expect } from '@playwright/test'
import { createHash } from 'node:crypto'

test('page, local assets, and strict production policy work without console errors', async ({
  page,
  request,
}) => {
  const errors: string[] = []
  const thirdParty: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('request', (req) => {
    if (!req.url().startsWith('http://127.0.0.1:4174') && !req.url().startsWith('data:'))
      thirdParty.push(req.url())
  })
  await page.goto('/')
  await expect(page).toHaveTitle('Kazeem Samod — Full-Stack Engineer')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Good software.Every layer.')
  await page.evaluate(() => document.fonts.ready)
  expect(await page.evaluate(() => document.fonts.check('16px Geist'))).toBe(true)
  await expect(page.getByRole('button', { name: 'Read Vantra case study' })).toBeVisible()
  const response = await request.get('/')
  expect(response.headers()['content-security-policy']).toContain("script-src 'self'")
  expect(errors).toEqual([])
  expect(thirdParty).toEqual([])
})

test('CV download is the exact PDF supplied by the user; social image is a real PNG', async ({ request }) => {
  const response = await request.get('/Kazeem-Samod-Full-Stack-CV.pdf')
  expect(response.ok()).toBe(true)
  expect(response.headers()['content-type']).toContain('application/pdf')
  expect(
    createHash('sha256')
      .update(await response.body())
      .digest('hex'),
  ).toBe('8538ee7039eae8d2ce0b6ea83dac7b5f599537924df033ef8e0fdd9773647577')
  const image = await request.get('/og.png')
  expect(image.headers()['content-type']).toContain('image/png')
  const bytes = await image.body()
  expect(bytes.subarray(1, 4).toString()).toBe('PNG')
  expect(bytes.readUInt32BE(16)).toBe(1200)
  expect(bytes.readUInt32BE(20)).toBe(630)
})

test('architecture tabs support pointer and keyboard selection', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('tab', { name: '03 Data' }).click()
  await expect(page.getByRole('tabpanel')).toContainText('A solid place to build on.')
  await page.keyboard.press('ArrowLeft')
  await expect(page.getByRole('tab', { name: '02 Application' })).toBeFocused()
  await expect(page.getByRole('tabpanel')).toContainText('The work behind the screen.')
  await page.keyboard.press('Home')
  await expect(page.getByRole('tab', { name: '01 Interface' })).toHaveAttribute('aria-selected', 'true')
  await page.keyboard.press('End')
  await expect(page.getByRole('tab', { name: '03 Data' })).toHaveAttribute('aria-selected', 'true')
})

test('case study URLs, native focus containment, Escape, and history navigation', async ({ page }) => {
  await page.goto('/')
  const trigger = page.getByRole('button', { name: 'Read Vantra case study' })
  await trigger.click()
  await expect(page).toHaveURL(/#project\/vantra$/)
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('heading', { name: 'Vantra', exact: true })).toBeVisible()
  await expect(dialog.getByRole('button', { name: 'Close case study' })).toBeFocused()
  await page.keyboard.press('Shift+Tab')
  expect(await page.evaluate(() => Boolean(document.activeElement?.closest('dialog')))).toBe(true)
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(trigger).toBeFocused()
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('')
  await trigger.click()
  await page.goBack()
  await expect(dialog).toHaveCount(0)
  await page.goForward()
  await expect(dialog).toBeVisible()
  await page.reload()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.getByRole('button', { name: 'Close case study' }).click()
  await expect(page.getByRole('dialog')).toHaveCount(0)
})

test('mobile navigation, full project archive, and case studies are usable by touch', async ({ browser }) => {
  const context = await browser.newContext({
    baseURL: 'http://127.0.0.1:4174',
    hasTouch: true,
    isMobile: true,
    reducedMotion: 'reduce',
  })
  const page = await context.newPage()
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const menu = page.getByRole('button', { name: 'Open navigation' })
  await menu.tap()
  await expect(page.getByRole('navigation')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(menu).toBeFocused()
  await menu.tap()
  await page.getByRole('navigation').getByRole('link', { name: 'Work' }).tap()
  await expect(page.getByRole('navigation')).not.toBeVisible()
  await expect(page).toHaveURL(/#work$/)
  await page.getByRole('button', { name: 'See all 11 projects' }).tap()
  const finedge = page.getByRole('button', { name: /FinEdge backend/ })
  await expect(finedge).toBeVisible()
  await finedge.tap()
  await expect(page.getByRole('dialog').getByRole('heading', { name: 'FinEdge', exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Close case study' }).tap()
  await page.getByRole('button', { name: 'Show fewer projects' }).tap()
  await expect(finedge).toHaveCount(0)
  await context.close()
})

test('clipboard actions copy useful values and give confirmation', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('/#contact')
  await page.getByRole('button', { name: 'Copy email address' }).click()
  await expect(page.getByRole('button', { name: 'Email address copied' })).toBeVisible()
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('ayokazeem60@gmail.com')
  await page.goto('/#project/wrapped')
  await page.getByRole('button', { name: 'Copy case study link' }).click()
  await expect(page.getByRole('button', { name: 'Link copied' })).toBeVisible()
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('#project/wrapped')
})

test('reduced motion and the JavaScript-disabled fallback remain usable', async ({ browser, page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto')
  await page.getByRole('tab', { name: '03 Data' }).click()
  await expect(page.getByRole('tabpanel')).toContainText('A solid place to build on.')
  const context = await browser.newContext({ javaScriptEnabled: false })
  const plainPage = await context.newPage()
  await plainPage.goto('http://127.0.0.1:4174/')
  await expect(plainPage.getByRole('heading', { name: 'Kazeem Samod — Full-Stack Engineer' })).toBeVisible()
  await expect(plainPage.getByRole('link', { name: 'Download my full-stack CV' })).toBeVisible()
  await context.close()
})
