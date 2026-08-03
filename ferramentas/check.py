from playwright.sync_api import sync_playwright
import pathlib
url = "file://" + str(pathlib.Path("index.html").resolve())
errs=[]
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={"width":1440,"height":900})
    pg.on("console", lambda m: errs.append(m.type+": "+m.text) if m.type in ("error","warning") else None)
    pg.on("pageerror", lambda e: errs.append("pageerror: "+str(e)))
    pg.goto(url); pg.wait_for_timeout(1500)
    # interações
    pg.click(".faq__q")                      # abre FAQ
    pg.wait_for_timeout(500)
    alt = pg.eval_on_selector(".faq__a","e=>e.style.maxHeight")
    pg.click("#next"); pg.wait_for_timeout(900)
    tx = pg.eval_on_selector("#track","e=>e.style.transform")
    pg.set_viewport_size({"width":390,"height":844})
    pg.wait_for_timeout(400); pg.click("#burger"); pg.wait_for_timeout(600)
    drawer = pg.eval_on_selector("#drawer","e=>e.classList.contains('is-open')")
    print("FAQ abre:", alt); print("carrossel avança:", tx); print("menu mobile abre:", drawer)
    print("H1 na página:", pg.eval_on_selector_all("h1","e=>e.length"))
    print("H2 na página:", pg.eval_on_selector_all("h2","e=>e.length"))
    print("erros de console:", errs or "nenhum")
    b.close()
