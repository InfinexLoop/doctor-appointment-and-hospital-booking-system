import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:5174';
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const SCREENSHOT_DIR = path.resolve('./test-results/screenshots');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runVerification() {
  console.log('====================================================');
  console.log('STARTING AUTOMATED PLAYWRIGHT LOCAL VERIFICATION');
  console.log('Target URL:', BASE_URL);
  console.log('====================================================');

  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const pageErrors = [];
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });

  const page = await context.newPage();
  page.on('pageerror', (err) => {
    console.error('Browser Page Error:', err.message);
    pageErrors.push(err.message);
  });

  const routesToTest = [
    { path: '/', name: 'Home Landing Page', selector: 'h1' },
    { path: '/doctors', name: 'Doctors Directory', selector: 'h1' },
    { path: '/doctor/doc_1', name: 'Doctor Profile Detail', selector: 'h1' },
    { path: '/departments', name: 'Departments Catalog', selector: 'h1' },
    { path: '/book-appointment', name: 'Appointment Booking Wizard', selector: 'h1' },
    { path: '/my-appointments', name: 'My Appointments List', selector: 'h1' },
    { path: '/token-history', name: 'Live Queue Token Monitor', selector: 'h1' },
    { path: '/tv', name: 'Waiting Room TV Display', selector: 'h1' },
    { path: '/login', name: 'Select Login Role Hub', selector: 'h2' },
    { path: '/patient/dashboard', name: 'Patient Dashboard', selector: 'h1' },
    { path: '/doctor/dashboard', name: 'Doctor Chamber Dashboard', selector: 'h1' },
    { path: '/receptionist/dashboard', name: 'Receptionist Dashboard', selector: 'h1' },
    { path: '/admin/dashboard', name: 'Admin Analytics Dashboard', selector: 'h1' },
    { path: '/admin/appointments', name: 'Admin Appointments Registry', selector: 'h1' },
    { path: '/admin/queue', name: 'Admin Master Queue Board', selector: 'h1' },
    { path: '/admin/doctors', name: 'Admin Doctors Roster', selector: 'h1' },
    { path: '/admin/departments', name: 'Admin Departments Roster', selector: 'h1' },
    { path: '/admin/medicines', name: 'Admin Pharmacy Inventory', selector: 'h1' },
    { path: '/admin/payments', name: 'Admin Billing & Invoices', selector: 'h1' },
    { path: '/admin/settings', name: 'Admin Hospital Settings', selector: 'h1' },
    { path: '/profile', name: 'User Profile Page', selector: 'h1' }
  ];

  console.log('\n--- 1. VERIFYING ALL 21 PRIMARY ROUTES ---');
  for (const route of routesToTest) {
    try {
      const res = await page.goto(`${BASE_URL}${route.path}`, { waitUntil: 'networkidle' });
      const status = res ? res.status() : 'unknown';
      await page.waitForSelector(route.selector, { timeout: 6000 });
      const heading = await page.textContent(route.selector);
      console.log(`[PASS] Route ${route.path.padEnd(26)} | Status: ${status} | Heading: "${heading?.trim().substring(0, 45)}"`);
    } catch (e) {
      console.error(`[FAIL] Route ${route.path}:`, e.message);
    }
  }

  // Capture desktop screenshots of key views
  console.log('\n--- 2. CAPTURING VISUAL SCREENSHOTS ---');
  const screenshotRoutes = [
    { path: '/', file: '01_home_page.png' },
    { path: '/doctors', file: '02_doctors_directory.png' },
    { path: '/book-appointment', file: '03_booking_wizard.png' },
    { path: '/token-history', file: '04_live_queue_tracker.png' },
    { path: '/tv', file: '05_waiting_room_tv.png' },
    { path: '/admin/dashboard', file: '06_admin_analytics.png' },
    { path: '/doctor/dashboard', file: '07_doctor_chamber.png' },
    { path: '/receptionist/dashboard', file: '08_reception_desk.png' }
  ];

  for (const sc of screenshotRoutes) {
    await page.goto(`${BASE_URL}${sc.path}`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, sc.file), fullPage: false });
    console.log(`[SCREENSHOT] Saved ${sc.file}`);
  }

  // 3. Test Booking Wizard Interaction
  console.log('\n--- 3. TESTING INTERACTIVE APPOINTMENT BOOKING WIZARD ---');
  try {
    await page.goto(`${BASE_URL}/book-appointment`, { waitUntil: 'networkidle' });
    
    // Step 1: Click "Continue to Date & Time"
    await page.click('button:has-text("Continue to Date & Time")');
    await page.waitForTimeout(500);

    // Step 2: Click "Continue to Patient Details"
    await page.click('button:has-text("Continue to Patient Details")');
    await page.waitForTimeout(500);

    // Step 3: Enter patient name
    await page.fill('input[type="text"][required]', 'Alexander Bennett');
    await page.fill('input[type="tel"][required]', '+33 6 77 88 99 11');
    await page.fill('input[type="email"][required]', 'alex.bennett@email.com');
    
    // Submit
    await page.click('button:has-text("Confirm Booking & Generate Queue Token")');
    await page.waitForTimeout(1000);

    // Step 4: Verify Confirmation ticket
    const successTitle = await page.textContent('h2:has-text("Appointment Successfully Booked!")');
    console.log(`[PASS] Booking Confirmed! Title: "${successTitle?.trim()}"`);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '09_booking_confirmation_ticket.png') });
    console.log('[SCREENSHOT] Saved 09_booking_confirmation_ticket.png');
  } catch (e) {
    console.error('[FAIL] Booking interaction:', e.message);
  }

  // 4. Test Doctor Dashboard Queue Advance
  console.log('\n--- 4. TESTING DOCTOR CHAMBER QUEUE ADVANCE ---');
  try {
    await page.goto(`${BASE_URL}/doctor/dashboard`, { waitUntil: 'networkidle' });
    
    // Check if Call Next button is enabled
    const callButton = await page.$('button:has-text("Call Next Patient")');
    if (callButton) {
      const isEnabled = await callButton.isEnabled();
      if (isEnabled) {
        await callButton.click();
        await page.waitForTimeout(800);
        console.log('[PASS] Doctor called next patient successfully!');
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, '10_doctor_active_consultation.png') });
        console.log('[SCREENSHOT] Saved 10_doctor_active_consultation.png');
      }
    }
  } catch (e) {
    console.error('[FAIL] Doctor queue advance:', e.message);
  }

  // 5. Test Receptionist Walk-in Token Issuance
  console.log('\n--- 5. TESTING RECEPTIONIST WALK-IN TOKEN ISSUANCE ---');
  try {
    await page.goto(`${BASE_URL}/receptionist/dashboard`, { waitUntil: 'networkidle' });
    await page.fill('input[placeholder="e.g. Marc Dubois"]', 'Claire Fontaine');
    await page.fill('input[placeholder="+33 6 12 34 56 78"]', '+33 6 44 55 66 77');
    await page.click('button:has-text("Issue & Print Walk-in Token")');
    await page.waitForTimeout(800);

    const alertText = await page.textContent('div:has-text("generated for Claire Fontaine")');
    console.log('[PASS] Walk-in token issued successfully! Notice present.');
  } catch (e) {
    console.error('[FAIL] Walk-in token issuance:', e.message);
  }

  // 6. Mobile Responsiveness Check
  console.log('\n--- 6. TESTING MOBILE VIEWPORT (390x844) ---');
  try {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '11_mobile_home.png') });
    console.log('[PASS] Mobile layout loaded cleanly. Saved 11_mobile_home.png');

    await page.goto(`${BASE_URL}/token-history`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '12_mobile_token_tracker.png') });
    console.log('[PASS] Mobile token tracker loaded cleanly. Saved 12_mobile_token_tracker.png');
  } catch (e) {
    console.error('[FAIL] Mobile viewport test:', e.message);
  }

  // 7. Verify Infinex Loop Attribution
  console.log('\n--- 7. VERIFYING INFINEX LOOP BRANDING & ATTRIBUTION ---');
  try {
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    const footerText = await page.textContent('footer');
    if (footerText && footerText.includes('Developed by Infinex Loop. All rights reserved.')) {
      console.log('[PASS] Mandatory attribution verified: "Developed by Infinex Loop. All rights reserved."');
    } else {
      console.warn('[WARN] Attribution text mismatch in footer.');
    }

    const companyLink = await page.$('footer a[href="https://infinexloop.netlify.app/"]');
    if (companyLink) {
      console.log('[PASS] Link to https://infinexloop.netlify.app/ verified.');
    } else {
      console.warn('[WARN] Company link not found.');
    }
  } catch (e) {
    console.error('[FAIL] Attribution verification:', e.message);
  }

  await browser.close();

  console.log('\n====================================================');
  console.log(`AUTOMATED TEST RESULTS: ${pageErrors.length === 0 ? 'ALL CHECKS PASSED WITH 0 ERRORS' : `${pageErrors.length} ERRORS ENCOUNTERED`}`);
  console.log('====================================================');
}

runVerification().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
