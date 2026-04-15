import puppeteer from 'puppeteer';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '../src/assets');
mkdirSync(outDir, { recursive: true });

const AFTER_HTML = `<!DOCTYPE html>
<html><head><meta charset="utf-8"/><style>*{margin:0;padding:0;box-sizing:border-box;}body{width:800px;height:500px;overflow:hidden;}</style></head>
<body>
<div style="width:800px;height:500px;transform-origin:top left;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,sans-serif;overflow:hidden;background:#f8fafc;">

  <!-- Nav -->
  <div style="background:#0f172a;height:50px;display:flex;align-items:center;justify-content:space-between;padding:0 40px;">
    <div style="color:white;font-weight:800;font-size:15px;letter-spacing:0.3px;">
      <span style="color:#f97316;">JC</span> Construction
    </div>
    <div style="display:flex;align-items:center;gap:24px;">
      <span style="color:#94a3b8;font-size:11px;font-weight:500;">Home</span>
      <span style="color:#94a3b8;font-size:11px;font-weight:500;">Services</span>
      <span style="color:#94a3b8;font-size:11px;font-weight:500;">Projects</span>
      <span style="color:#94a3b8;font-size:11px;font-weight:500;">About</span>
      <span style="background:#f97316;color:white;font-size:10px;font-weight:700;padding:6px 16px;border-radius:6px;letter-spacing:0.3px;">Get Quote</span>
    </div>
  </div>

  <!-- Hero -->
  <div style="background:linear-gradient(135deg,#0f172a 0%,#1a2744 55%,#0c1822 100%);height:224px;display:flex;align-items:center;padding:0 40px;position:relative;overflow:hidden;">
    <div style="position:absolute;inset:0;opacity:0.06;background-image:repeating-linear-gradient(0deg,transparent,transparent 29px,#ffffff 30px),repeating-linear-gradient(90deg,transparent,transparent 29px,#ffffff 30px);"></div>
    <div style="position:absolute;left:0;top:0;bottom:0;width:4px;background:#f97316;"></div>
    <div style="position:relative;z-index:1;">
      <div style="color:#f97316;font-size:9px;font-weight:800;letter-spacing:4px;text-transform:uppercase;margin-bottom:10px;">Excellence in Every Build</div>
      <div style="color:white;font-size:34px;font-weight:900;line-height:1.1;letter-spacing:-0.04em;">
        Building Your Vision<br/>
        <span style="color:#f97316;">Since 1987</span>
      </div>
      <div style="color:#94a3b8;font-size:10.5px;line-height:1.65;margin:10px 0 18px;max-width:300px;">
        Premium residential &amp; commercial construction.<br/>Trusted by 500+ clients across the region.
      </div>
      <div style="display:flex;gap:10px;">
        <span style="background:#f97316;color:white;font-size:10px;font-weight:700;padding:8px 20px;border-radius:7px;letter-spacing:0.3px;">Get Free Quote</span>
        <span style="border:1.5px solid #334155;color:#cbd5e1;font-size:10px;font-weight:600;padding:8px 20px;border-radius:7px;">View Projects &#x2192;</span>
      </div>
    </div>
    <div style="margin-left:auto;display:flex;flex-direction:column;gap:12px;position:relative;z-index:1;">
      <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:14px 24px;text-align:center;min-width:90px;">
        <div style="color:white;font-size:26px;font-weight:900;letter-spacing:-0.03em;line-height:1;">500+</div>
        <div style="color:#64748b;font-size:8.5px;text-transform:uppercase;letter-spacing:1.5px;margin-top:3px;font-weight:600;">Projects</div>
      </div>
      <div style="background:rgba(249,115,22,0.1);border:1px solid rgba(249,115,22,0.2);border-radius:12px;padding:14px 24px;text-align:center;">
        <div style="color:#f97316;font-size:26px;font-weight:900;letter-spacing:-0.03em;line-height:1;">25+</div>
        <div style="color:#64748b;font-size:8.5px;text-transform:uppercase;letter-spacing:1.5px;margin-top:3px;font-weight:600;">Years</div>
      </div>
    </div>
  </div>

  <!-- Services row -->
  <div style="display:flex;background:white;border-bottom:1px solid #e2e8f0;">
    <div style="flex:1;padding:16px 22px;border-right:1px solid #e2e8f0;display:flex;align-items:center;gap:12px;">
      <div style="width:36px;height:36px;background:#fff7ed;border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
      </div>
      <div>
        <div style="font-size:12px;font-weight:700;color:#0f172a;line-height:1.2;">Residential</div>
        <div style="font-size:9.5px;color:#64748b;margin-top:2px;">Custom homes &amp; renovations</div>
      </div>
    </div>
    <div style="flex:1;padding:16px 22px;border-right:1px solid #e2e8f0;display:flex;align-items:center;gap:12px;">
      <div style="width:36px;height:36px;background:#fff7ed;border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      </div>
      <div>
        <div style="font-size:12px;font-weight:700;color:#0f172a;line-height:1.2;">Commercial</div>
        <div style="font-size:9.5px;color:#64748b;margin-top:2px;">Office &amp; retail builds</div>
      </div>
    </div>
    <div style="flex:1;padding:16px 22px;display:flex;align-items:center;gap:12px;">
      <div style="width:36px;height:36px;background:#fff7ed;border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
      </div>
      <div>
        <div style="font-size:12px;font-weight:700;color:#0f172a;line-height:1.2;">Renovations</div>
        <div style="font-size:9.5px;color:#64748b;margin-top:2px;">Full remodels &amp; repairs</div>
      </div>
    </div>
  </div>

  <!-- Bottom CTA bar -->
  <div style="background:#f97316;padding:15px 40px;display:flex;align-items:center;justify-content:space-between;">
    <div>
      <div style="color:white;font-weight:800;font-size:13px;letter-spacing:-0.01em;">Ready to start your project?</div>
      <div style="color:rgba(255,255,255,0.75);font-size:9.5px;margin-top:3px;">Free consultations · No obligation · Licensed &amp; insured</div>
    </div>
    <div style="display:flex;align-items:center;gap:14px;">
      <div style="color:white;font-size:12px;font-weight:700;">(555) 010-1987</div>
      <span style="background:white;color:#f97316;font-size:10px;font-weight:800;padding:8px 18px;border-radius:7px;letter-spacing:0.2px;">Contact Us &#x2192;</span>
    </div>
  </div>

</div>
</body></html>`;

const BEFORE_HTML = `<!DOCTYPE html>
<html><head><meta charset="utf-8"/><style>*{margin:0;padding:0;box-sizing:border-box;}body{width:800px;height:500px;overflow:hidden;}</style></head>
<body>
<div style="width:800px;height:500px;transform-origin:top left;overflow:hidden;background:#fffff0;">

  <!-- Ugly header -->
  <div style="background:navy;text-align:center;padding:8px 0;border-bottom:5px solid red;">
    <div style="font-family:'Comic Sans MS','Comic Sans',cursive,Arial;font-size:22px;font-weight:bold;color:yellow;text-shadow:2px 2px 0 red;">
      &#9733; JOHNSON CONSTRUCTION CO &#9733;
    </div>
    <div style="font-family:'Comic Sans MS','Comic Sans',cursive,Arial;font-size:10px;color:#ff0;font-style:italic;margin-top:2px;">
      "We Build Stuff Good!!!"
    </div>
  </div>

  <!-- Ugly nav -->
  <div style="background:#cc0000;padding:5px 0;text-align:center;border-top:3px solid yellow;border-bottom:3px solid yellow;">
    <span style="color:white;font-size:10px;font-family:Arial;margin:0 10px;text-decoration:underline;cursor:pointer;">HOME</span>
    <span style="color:white;font-size:10px;font-family:Arial;margin:0 10px;text-decoration:underline;cursor:pointer;">ABOUT US</span>
    <span style="color:yellow;font-size:10px;font-family:Arial;font-weight:bold;margin:0 10px;text-decoration:underline;cursor:pointer;">SERVICES</span>
    <span style="color:white;font-size:10px;font-family:Arial;margin:0 10px;text-decoration:underline;cursor:pointer;">CONTACT</span>
    <span style="color:white;font-size:10px;font-family:Arial;margin:0 10px;text-decoration:underline;cursor:pointer;">GALLERY</span>
    <span style="color:white;font-size:10px;font-family:Arial;margin:0 10px;text-decoration:underline;cursor:pointer;">LINKS</span>
  </div>

  <!-- Body: 3-column table layout -->
  <div style="display:flex;height:368px;font-family:Arial,sans-serif;">

    <!-- Left sidebar -->
    <div style="width:150px;background:#cccccc;border-right:2px solid #999999;padding:8px;flex-shrink:0;overflow:hidden;">
      <div style="background:#00008b;color:white;font-size:9.5px;font-weight:bold;padding:4px;text-align:center;margin-bottom:8px;border:1px solid #000066;">QUICK LINKS</div>
      <div style="font-size:9.5px;color:blue;text-decoration:underline;margin-bottom:5px;cursor:pointer;">&#187; Concrete Work</div>
      <div style="font-size:9.5px;color:blue;text-decoration:underline;margin-bottom:5px;cursor:pointer;">&#187; Roofing Services</div>
      <div style="font-size:9.5px;color:blue;text-decoration:underline;margin-bottom:5px;cursor:pointer;">&#187; Demolition</div>
      <div style="font-size:9.5px;color:blue;text-decoration:underline;margin-bottom:5px;cursor:pointer;">&#187; Excavation</div>
      <div style="font-size:9.5px;color:blue;text-decoration:underline;margin-bottom:5px;cursor:pointer;">&#187; Free Estimates!</div>
      <div style="font-size:9.5px;color:blue;text-decoration:underline;margin-bottom:5px;cursor:pointer;">&#187; Photo Gallery</div>
      <hr style="border:1px solid #999;margin:8px 0;"/>
      <div style="background:#ff6600;color:white;font-size:9px;text-align:center;padding:7px 4px;border:2px solid #cc3300;font-family:Arial;">
        &#11088; CALL NOW!<br/>
        <span style="font-size:12px;font-weight:bold;">(555) 0101</span><br/>
        FREE QUOTES!
      </div>
      <hr style="border:1px solid #999;margin:8px 0;"/>
      <div style="font-size:8.5px;text-align:center;color:#333;font-family:'Courier New',monospace;">
        Visitors:<br/>
        <span style="font-size:11px;font-weight:bold;letter-spacing:2px;">00847</span>
      </div>
      <hr style="border:1px solid #999;margin:8px 0;"/>
      <div style="font-size:8px;color:#660000;text-align:center;font-style:italic;">
        Best viewed in<br/>Internet Explorer 6<br/>at 800&#215;600
      </div>
    </div>

    <!-- Main content -->
    <div style="flex:1;padding:12px 14px;overflow:hidden;background:#fffff0;">
      <div style="color:red;font-size:13px;font-weight:bold;text-align:center;font-family:'Comic Sans MS','Comic Sans',cursive;margin-bottom:6px;">
        *** WELCOME TO OUR WEB SITE!! ***
      </div>
      <p style="font-size:10px;color:#333;line-height:1.6;margin:0 0 8px;">
        We are <b>Johnson Construction CO.</b> located in Springfield. We have been building stuff since 1987 and we are the BEST in the biz!! We do all kinds of construction work including roofing, concrete, framing and more!!! Give us a call for a FREE estimate today!
      </p>
      <div style="background:#ffff99;border:2px dashed #ff0000;padding:8px 10px;font-size:9.5px;margin-bottom:10px;font-family:Arial;">
        <span style="color:#cc0000;font-weight:bold;">&#128679; NOTICE: </span>
        <i>This page is still under construction. Check back soon for more info!!</i>
      </div>
      <div style="font-size:10.5px;font-weight:bold;color:#00008b;margin-bottom:6px;text-decoration:underline;">OUR SERVICES:</div>
      <table style="font-size:9.5px;border:2px solid #999999;width:100%;border-collapse:collapse;margin-bottom:8px;">
        <tr style="background:#ccccff;">
          <td style="padding:3px 6px;border:1px solid #999;color:#00008b;font-weight:bold;">&#9733; Residential Construction</td>
          <td style="padding:3px 6px;border:1px solid #999;color:#333;">We build homes and stuff!!</td>
        </tr>
        <tr style="background:#ffffff;">
          <td style="padding:3px 6px;border:1px solid #999;color:#00008b;font-weight:bold;">&#9733; Commercial Projects</td>
          <td style="padding:3px 6px;border:1px solid #999;color:#333;">Big buildings too</td>
        </tr>
        <tr style="background:#ccccff;">
          <td style="padding:3px 6px;border:1px solid #999;color:#00008b;font-weight:bold;">&#9733; Roof Repair &amp; Install</td>
          <td style="padding:3px 6px;border:1px solid #999;color:#333;">We fix roofs good</td>
        </tr>
        <tr style="background:#ffffff;">
          <td style="padding:3px 6px;border:1px solid #999;color:#00008b;font-weight:bold;">&#9733; Concrete &amp; Foundations</td>
          <td style="padding:3px 6px;border:1px solid #999;color:#333;">Strong foundations!!</td>
        </tr>
      </table>
      <div style="font-size:9px;color:#666;font-style:italic;text-align:center;">
        * Click the links on the left to learn more about our services *
      </div>
    </div>

    <!-- Right sidebar -->
    <div style="width:138px;border-left:2px solid #999;padding:8px;flex-shrink:0;background:#e8e8e8;overflow:hidden;">
      <div style="background:#ff0000;color:white;font-size:8.5px;text-align:center;padding:5px;font-weight:bold;border:2px solid #990000;margin-bottom:8px;">
        &#127942; AWARD WINNING<br/>COMPANY!!
      </div>
      <div style="margin-bottom:8px;font-size:9px;color:#333;text-align:center;border:1px dashed #999;padding:12px 6px;background:white;font-style:italic;">
        [photo coming soon]
      </div>
      <div style="background:#ffffcc;border:2px solid #cccc00;font-size:8.5px;padding:6px;margin-bottom:8px;">
        <b style="color:#cc6600;">MONTHLY SPECIALS:</b><br/>
        <span style="color:#cc0000;">10% OFF</span> any job this month only!!! Call now!!!!
      </div>
      <div style="background:#ccffcc;border:1px solid #009900;font-size:8px;padding:5px;text-align:center;">
        <b>100% SATISFACTION<br/>GUARANTEED!!!</b><br/>
        <span style="font-size:7px;">or your money back*</span>
      </div>
      <div style="font-size:7px;color:#999;margin-top:4px;text-align:center;font-style:italic;">*some conditions apply</div>
    </div>

  </div>

  <!-- Ugly footer -->
  <div style="background:#333333;color:#cccccc;font-size:8.5px;text-align:center;padding:7px;border-top:3px solid red;font-family:Arial;">
    Copyright &copy; 2003 Johnson Construction CO. All Rights Reserved. &nbsp;|&nbsp; Webmaster: Bob &nbsp;|&nbsp; Last Updated: March 2003
  </div>

</div>
</body></html>`;

const browser = await puppeteer.launch({ headless: true });

async function renderToPng(html, outputPath) {
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 500, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const screenshot = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: 800, height: 500 } });
  writeFileSync(outputPath, screenshot);
  await page.close();
  console.log(`Saved: ${outputPath}`);
}

await renderToPng(AFTER_HTML, resolve(outDir, 'mockup-after.png'));
await renderToPng(BEFORE_HTML, resolve(outDir, 'mockup-before.png'));

await browser.close();
console.log('Done.');
