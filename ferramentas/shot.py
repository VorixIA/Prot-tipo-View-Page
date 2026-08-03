from playwright.sync_api import sync_playwright
import pathlib
url = "file://" + str(pathlib.Path("index.html").resolve())
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width":1440,"height":900}, device_scale_factor=1)
    pg.goto(url); pg.wait_for_timeout(1200)
    pg.evaluate("window.scrollTo(0, document.body.scrollHeight)"); pg.wait_for_timeout(2500)
    pg.evaluate("window.scrollTo(0,0)"); pg.wait_for_timeout(800)
    pg.screenshot(path="full.png", full_page=True)
    # mobile
    m = b.new_page(viewport={"width":390,"height":844})
    m.goto(url); m.wait_for_timeout(800)
    m.evaluate("window.scrollTo(0, document.body.scrollHeight)"); m.wait_for_timeout(2000)
    m.evaluate("window.scrollTo(0,0)"); m.wait_for_timeout(600)
    m.screenshot(path="mob.png", full_page=True)
    print("altura desktop:", pg.evaluate("document.body.scrollHeight"))
    print("overflow horizontal:", pg.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth"))
    print("overflow mobile:", m.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth"), m.evaluate("document.documentElement.scrollWidth"))
    b.close()
