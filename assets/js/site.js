/* HUAXIN site behaviour — vanilla JS, no dependencies.
   Every feature checks for its elements first, so one file serves all pages. */
(function () {
  "use strict";
  var doc = document.documentElement;
  doc.classList.add("js");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Interface strings for the four site languages (page text itself is translated in the HTML). */
  var LANG = (doc.getAttribute("lang") || "en").slice(0, 2);
  var STR = {
    en: { size: "Element size", yourModel: "Your model", ratedAt: "Rated at:", sizingNote: "A selector cannot size a plant. Element count, pressures and permeate quality come from a system projection on your feed analysis.", quoteModel: "Request a quote for this model", review: "Request a design & cost review", datasheet: "Datasheet (PDF)", pickApp: "Choose what you need to do with your water.", pickSal: "Choose your feed salinity to see a recommendation.",
      r_xlp: "Feed below 1,000 ppm: extra-low-pressure RO keeps energy use lowest.", r_lp: "Feed below 2,000 ppm: low-pressure RO with strong cleaning tolerance.",
      r_bwfr_foul: "High-fouling brackish feed below 5,000 ppm: anti-fouling RO, 693-day field record.", r_bw: "Brackish feed below 5,000 ppm.",
      r_bwfr_opt: "Choose the anti-fouling version if fouling potential is high.", r_sw: "Feed above 10,000 ppm, brine, mine water or ZLD: seawater RO rated to 8.0 MPa.",
      r_mid1: "5,000–10,000 ppm is between the manual's stated ranges; talk to HUAXIN engineers. HX-BWFR or HX-SW are the likely starting points.",
      r_mid2: "Consider for the upper end of this range or high scaling potential.", r_hq: "Softening, color and odor removal while retaining minerals for taste.",
      r_uf_pre: "UF pretreatment or particle and microbe removal.", r_bm: "Separates divalent salts and organics above 200 Da from monovalent salts.",
      r_mbr: "Biological treatment of municipal or industrial wastewater, 150–400 m³/d per module.", r_uf: "Surface water, drinking water and process water filtration, pores below 30 nm.",
      selNote: "Indicative guidance based on the feed ranges stated in the HUAXIN product manual. Confirm system design with HUAXIN technical support.",
      formFix: "Please complete the highlighted fields.", formOk: "Thank you. Your inquiry has been sent to the HUAXIN team. We will reply to the email address you gave.",
      formFail: "Sorry, the message could not be sent from this page. Please email {m} directly, or try again later.", sending: "Sending…", send: "Send inquiry",
      mailto: "Your email app should now open with this inquiry ready to send to {m}. If nothing opens, email us directly at that address.", open: "Open menu", close: "Close menu" },
    es: { size: "Tamaño del elemento", yourModel: "Su modelo", ratedAt: "Medido a:", sizingNote: "Un selector no dimensiona una planta. El número de elementos, las presiones y la calidad del permeado salen de una proyección del sistema con su análisis de agua.", quoteModel: "Solicitar cotización de este modelo", review: "Solicitar revisión de diseño y costes", datasheet: "Ficha técnica (PDF)", pickApp: "Elija qué necesita hacer con su agua.", pickSal: "Elija la salinidad de su agua de alimentación para ver una recomendación.",
      r_xlp: "Alimentación por debajo de 1.000 ppm: la RO de presión extra baja minimiza el consumo energético.", r_lp: "Alimentación por debajo de 2.000 ppm: RO de baja presión con gran tolerancia a la limpieza.",
      r_bwfr_foul: "Agua salobre con alto ensuciamiento por debajo de 5.000 ppm: RO antiincrustante, registro de campo de 693 días.", r_bw: "Agua salobre por debajo de 5.000 ppm.",
      r_bwfr_opt: "Elija la versión antiincrustante si el potencial de ensuciamiento es alto.", r_sw: "Alimentación por encima de 10.000 ppm, salmuera, agua de mina o ZLD: RO para agua de mar hasta 8,0 MPa.",
      r_mid1: "5.000–10.000 ppm queda entre los rangos del manual; consulte a los ingenieros de HUAXIN. HX-BWFR o HX-SW son los puntos de partida probables.",
      r_mid2: "Considérelo para el extremo superior del rango o alto potencial de incrustación.", r_hq: "Ablandamiento y eliminación de color y olor, conservando minerales para el sabor.",
      r_uf_pre: "Pretratamiento con UF o eliminación de partículas y microbios.", r_bm: "Separa sales divalentes y materia orgánica de más de 200 Da de las sales monovalentes.",
      r_mbr: "Tratamiento biológico de aguas residuales municipales o industriales, 150–400 m³/d por módulo.", r_uf: "Filtración de agua superficial, potable y de proceso, poros inferiores a 30 nm.",
      selNote: "Orientación indicativa basada en los rangos de alimentación del manual de productos de HUAXIN. Confirme el diseño del sistema con el soporte técnico de HUAXIN.",
      formFix: "Complete los campos resaltados.", formOk: "Gracias. Su consulta se ha enviado al equipo de HUAXIN. Responderemos a la dirección de correo indicada.",
      formFail: "No se pudo enviar el mensaje desde esta página. Escriba directamente a {m} o inténtelo más tarde.", sending: "Enviando…", send: "Enviar consulta",
      mailto: "Su aplicación de correo debería abrirse con la consulta lista para enviar a {m}. Si no se abre, escríbanos directamente a esa dirección.", open: "Abrir menú", close: "Cerrar menú" },
    ar: { size: "مقاس العنصر", yourModel: "الطراز المختار", ratedAt: "مقيس عند:", sizingNote: "لا تحدد أداة الاختيار حجم المحطة. عدد العناصر والضغوط وجودة النفاذ تأتي من محاكاة للنظام على تحليل مياهك.", quoteModel: "اطلب عرض سعر لهذا الطراز", review: "اطلب مراجعة التصميم والتكلفة", datasheet: "ورقة البيانات (PDF)", pickApp: "اختر ما تحتاج إلى فعله بمياهك.", pickSal: "اختر ملوحة مياه التغذية لعرض التوصية.",
      r_xlp: "تغذية دون ‎1,000 ppm: التناضح العكسي بضغط منخفض جدًا يحقق أدنى استهلاك للطاقة.", r_lp: "تغذية دون ‎2,000 ppm: تناضح عكسي منخفض الضغط بتحمّل عالٍ للتنظيف.",
      r_bwfr_foul: "مياه قليلة الملوحة عالية الاتساخ دون ‎5,000 ppm: تناضح عكسي مقاوم للاتساخ بسجل ميداني 693 يومًا.", r_bw: "مياه قليلة الملوحة دون ‎5,000 ppm.",
      r_bwfr_opt: "اختر النسخة المقاومة للاتساخ إذا كان احتمال الاتساخ عاليًا.", r_sw: "تغذية تتجاوز ‎10,000 ppm أو محاليل ملحية أو مياه مناجم أو تصريف صفري: تناضح عكسي لمياه البحر حتى ‎8.0 MPa.",
      r_mid1: "نطاق ‎5,000–10,000 ppm يقع بين النطاقات المذكورة في الدليل؛ تحدّث إلى مهندسي HUAXIN. نقطة البداية المرجحة HX-BWFR أو HX-SW.",
      r_mid2: "يُنظر فيه للطرف الأعلى من النطاق أو عند ارتفاع احتمال الترسّب.", r_hq: "تليين وإزالة اللون والرائحة مع الاحتفاظ بالمعادن من أجل المذاق.",
      r_uf_pre: "معالجة مسبقة بالترشيح الفائق أو إزالة الجسيمات والميكروبات.", r_bm: "يفصل الأملاح ثنائية التكافؤ والمواد العضوية الأكبر من ‎200 Da عن الأملاح أحادية التكافؤ.",
      r_mbr: "معالجة بيولوجية لمياه الصرف البلدية أو الصناعية،‎ 150–400 m³/d لكل وحدة.", r_uf: "ترشيح المياه السطحية ومياه الشرب ومياه العمليات، بمسام أقل من ‎30 nm.",
      selNote: "إرشاد تقريبي استنادًا إلى نطاقات التغذية في دليل منتجات HUAXIN. أكّد تصميم النظام مع الدعم الفني لدى HUAXIN.",
      formFix: "يرجى استكمال الحقول المحددة.", formOk: "شكرًا لك. أُرسل استفسارك إلى فريق HUAXIN، وسنرد على البريد الإلكتروني الذي أدخلته.",
      formFail: "عذرًا، تعذّر إرسال الرسالة من هذه الصفحة. يرجى مراسلتنا مباشرة على {m} أو المحاولة لاحقًا.", sending: "جارٍ الإرسال…", send: "إرسال الاستفسار",
      mailto: "يُفترض أن يفتح تطبيق البريد لديك وفيه هذا الاستفسار جاهزًا للإرسال إلى {m}. إن لم يُفتح، راسلنا مباشرة على هذا العنوان.", open: "فتح القائمة", close: "إغلاق القائمة" },
    zh: { size: "元件规格", yourModel: "您的型号", ratedAt: "测试条件：", sizingNote: "选型工具无法替代系统设计。元件数量、压力和产水水质需依据您的水质分析进行系统模拟计算。", quoteModel: "索取该型号报价", review: "申请设计与成本评估", datasheet: "规格书（PDF）", pickApp: "请选择您的水处理需求。", pickSal: "请选择进水含盐量以查看推荐。",
      r_xlp: "进水低于 1,000 ppm：超低压反渗透，能耗最低。", r_lp: "进水低于 2,000 ppm：低压反渗透，耐清洗性强。",
      r_bwfr_foul: "高污染苦咸水，低于 5,000 ppm：抗污染反渗透，拥有 693 天现场记录。", r_bw: "苦咸水，低于 5,000 ppm。",
      r_bwfr_opt: "污染风险较高时，请选择抗污染版本。", r_sw: "进水高于 10,000 ppm、浓盐水、矿井水或零排放：海水反渗透，最高 8.0 MPa。",
      r_mid1: "5,000–10,000 ppm 介于手册所列范围之间，请咨询华信工程师。可优先考虑 HX-BWFR 或 HX-SW。",
      r_mid2: "适用于该范围上限或结垢风险较高的情况。", r_hq: "软化、脱色除味，同时保留矿物质改善口感。",
      r_uf_pre: "超滤预处理，或去除颗粒物与微生物。", r_bm: "将二价盐及 200 Da 以上有机物与一价盐分离。",
      r_mbr: "市政或工业废水生化处理，每个组件 150–400 m³/d。", r_uf: "地表水、饮用水及工艺用水过滤，孔径小于 30 nm。",
      selNote: "以上为依据华信产品手册进水范围给出的参考建议，系统设计请与华信技术支持确认。",
      formFix: "请填写标出的必填项。", formOk: "感谢您的咨询，信息已发送至华信团队。我们将回复至您填写的邮箱。",
      formFail: "抱歉，无法从此页面发送。请直接发送邮件至 {m}，或稍后重试。", sending: "正在发送…", send: "提交咨询",
      mailto: "您的邮件程序应已打开，咨询内容已填好，可直接发送至 {m}。如未打开，请直接发邮件至该地址。", open: "打开菜单", close: "关闭菜单" }
  };
  var t = function (k, m) { var s = (STR[LANG] || STR.en)[k] || STR.en[k]; return m ? s.replace("{m}", m) : s; };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* Header: solid after scroll */
  var hdr = $(".hdr");
  function onScroll() {
    if (!hdr) return;
    hdr.classList.toggle("solid", window.scrollY > 24 || document.body.classList.contains("nav-open"));
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Products mega menu */
  var megaBtn = $("[data-mega-btn]"), mega = $("#mega");
  if (megaBtn && mega) {
    var closeT;
    var setMega = function (open) {
      megaBtn.setAttribute("aria-expanded", open ? "true" : "false");
      mega.classList.toggle("open", open);
    };
    megaBtn.addEventListener("click", function () { setMega(megaBtn.getAttribute("aria-expanded") !== "true"); });
    var li = megaBtn.parentElement;
    li.addEventListener("mouseenter", function () { clearTimeout(closeT); if (window.matchMedia("(hover:hover)").matches) setMega(true); });
    li.addEventListener("mouseleave", function () { closeT = setTimeout(function () { setMega(false); }, 180); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { setMega(false); } });
    document.addEventListener("click", function (e) { if (!li.contains(e.target)) setMega(false); });
    li.addEventListener("focusout", function (e) { if (!li.contains(e.relatedTarget)) setMega(false); });
  }

  /* Language menu */
  var lb_ = $("[data-lang-btn]"), lm = $("#langmenu");
  if (lb_ && lm) {
    var setL = function (o) { lb_.setAttribute("aria-expanded", o ? "true" : "false"); lm.classList.toggle("open", o); };
    lb_.addEventListener("click", function (e) { e.stopPropagation(); setL(lb_.getAttribute("aria-expanded") !== "true"); });
    document.addEventListener("click", function (e) { if (!lm.contains(e.target)) setL(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setL(false); });
    lb_.parentElement.addEventListener("focusout", function (e) { if (!lb_.parentElement.contains(e.relatedTarget)) setL(false); });
  }

  /* Mobile navigation */
  var burger = $(".burger"), mnav = $("#mnav");
  if (burger && mnav) {
    burger.addEventListener("click", function () {
      var open = burger.getAttribute("aria-expanded") !== "true";
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? t("close") : t("open"));
      mnav.classList.toggle("open", open);
      document.body.classList.toggle("nav-open", open);
      mnav.toggleAttribute("inert", !open);
      onScroll();
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && mnav.classList.contains("open")) burger.click(); });
  }

  /* Reveal on scroll */
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    $$(".rv, .reveal-bars").forEach(function (el) { io.observe(el); });
  } else {
    $$(".rv, .reveal-bars").forEach(function (el) { el.classList.add("in"); });
  }

  /* Count-up numbers: <b data-count="99.62" data-dec="2" data-suffix="%"> */
  function countUp(el) {
    var end = parseFloat(el.getAttribute("data-count")), dec = parseInt(el.getAttribute("data-dec") || "0", 10);
    var pre = el.getAttribute("data-prefix") || "", suf = el.getAttribute("data-suffix") || "";
    var from = parseFloat(el.getAttribute("data-from") || "0");
    var fmt = function (v) { return pre + v.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf; };
    if (reduce) { el.textContent = fmt(end); return; }
    var t0 = null, dur = 1400;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(from + (end - from) * e);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { countUp(en.target); co.unobserve(en.target); } });
    }, { threshold: 0.6 });
    $$("[data-count]").forEach(function (el) { co.observe(el); });
  }

  /* Hero: element end-face turns slowly with scroll */
  var heroEl = $(".hero-el");
  if (heroEl && !reduce) {
    var ticking = false;
    var upd = function () {
      var y = Math.min(window.scrollY, window.innerHeight);
      heroEl.style.setProperty("--rot", (y * 0.045).toFixed(2) + "deg");
      heroEl.style.setProperty("--sc", (1 + y * 0.00012).toFixed(4));
      ticking = false;
    };
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
  }

  /* Inside HUAXIN film: explicit play/pause control (WCAG 2.2.2) */
  $$(".vid-toggle").forEach(function (b) {
    var v = document.getElementById(b.getAttribute("aria-controls")); if (!v) return;
    var sync = function () { var on = !v.paused; b.classList.toggle("playing", on); b.setAttribute("aria-label", b.getAttribute(on ? "data-label-pause" : "data-label-play")); };
    b.addEventListener("click", function () { if (v.paused) { v.userPaused = false; var p = v.play(); if (p && p.catch) p.catch(function () {}); } else { v.userPaused = true; v.pause(); } });
    v.addEventListener("play", sync); v.addEventListener("pause", sync); sync();
  });
  var smallOrSaver = window.matchMedia("(max-width: 700px)").matches || (navigator.connection && navigator.connection.saveData);

  /* Videos: play only while visible; never under reduced motion */
  var vids = $$("video[data-autoplay]");
  if (vids.length) {
    if (reduce) {
      vids.forEach(function (v) { v.removeAttribute("autoplay"); v.pause(); if (!v.parentElement.querySelector(".vid-toggle")) v.setAttribute("controls", ""); });
    } else if ("IntersectionObserver" in window) {
      var vo = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          var v = en.target;
          if (en.isIntersecting) { if (v.userPaused || (smallOrSaver && v.hasAttribute("data-desktop-only"))) return; var p = v.play(); if (p && p.catch) p.catch(function () {}); } else { v.pause(); }
        });
      }, { threshold: 0.25 });
      vids.forEach(function (v) { vo.observe(v); });
    }
  }

  /* Separation illustration: water passes the membrane, salts are rejected (illustrative, not to scale) */
  $$(".sep-stage").forEach(function (stage) {
    var cv = $("canvas", stage); if (!cv || !cv.getContext) return;
    var ctx = cv.getContext("2d"), W = 0, H = 0, dpr = Math.min(2, window.devicePixelRatio || 1), parts = [], running = false, raf;
    var rtl = doc.getAttribute("dir") === "rtl";
    var size = function () { var r = stage.getBoundingClientRect(); W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    var mem = function () { return H * 0.5; };
    var spawn = function (init) {
      var salt = Math.random() < 0.32;
      var p = { x: Math.random() * W, y: init ? Math.random() * mem() * 0.9 : -10, vx: (rtl ? -1 : 1) * (0.25 + Math.random() * 0.35), vy: 0.35 + Math.random() * 0.5, salt: salt, r: salt ? 4.2 : 2.4, state: 0 };
      if (init && !salt && Math.random() < 0.45) { p.y = mem() + 10 + Math.random() * (H - mem() - 20); p.state = 1; p.vy = 0.8 + Math.random() * 0.4; p.vx *= 0.4; }
      return p;
    };
    var reset = function () { parts = []; var n = Math.round(W * H / 2600); for (var i = 0; i < n; i++) parts.push(spawn(true)); };
    var drawMem = function () {
      var y = mem();
      ctx.fillStyle = "rgba(138,106,85,.9)"; ctx.fillRect(0, y - 5, W, 10);
      ctx.fillStyle = "rgba(231,217,188,.35)"; for (var x = 4; x < W; x += 9) ctx.fillRect(x, y - 5, 2, 10);
      ctx.fillStyle = "rgba(191,220,203,.06)"; ctx.fillRect(0, y + 5, W, H - y - 5);
    };
    var frame = function () {
      ctx.clearRect(0, 0, W, H); drawMem();
      var y0 = mem();
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.state === 0 && p.y + p.r >= y0 - 5) {
          if (p.salt) { p.vy = -Math.abs(p.vy) * 0.6; p.vx *= 1.8; p.state = 2; }
          else { p.state = 1; p.vy = 0.8 + Math.random() * 0.4; p.vx *= 0.4; }
        }
        if (p.state === 2 && p.y < y0 * 0.55) p.vy = 0.15;
        if (p.state === 2 && p.y > y0 - 12) p.vy = -0.2;
        if (p.y > H + 10 || p.x > W + 10 || p.x < -10) parts[i] = spawn(false);
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283);
        ctx.fillStyle = p.salt ? "rgba(231,217,188,.95)" : (p.state === 1 ? "rgba(191,220,203,1)" : "rgba(191,220,203,.75)"); ctx.fill();
        if (p.salt) { ctx.strokeStyle = "rgba(231,217,188,.3)"; ctx.lineWidth = 2; ctx.stroke(); }
      }
      if (running) raf = requestAnimationFrame(frame);
    };
    size(); reset();
    if (reduce) { for (var k = 0; k < 400; k++) { running = false; frame(); } return; }
    window.addEventListener("resize", function () { size(); reset(); });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting && !running) { running = true; frame(); } else if (!e.isIntersecting) { running = false; cancelAnimationFrame(raf); } }); }, { threshold: 0.1 }).observe(stage);
    } else { running = true; frame(); }
  });

  /* Product page section nav highlight */
  var pnavLinks = $$(".pnav a[href^='#']");
  if (pnavLinks.length && "IntersectionObserver" in window) {
    var map = {};
    pnavLinks.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          pnavLinks.forEach(function (a) { a.classList.remove("active"); });
          var a = map[en.target.id]; if (a) a.classList.add("active");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) so.observe(s); });
  }

  /* Product family filter */
  var ftabs = $(".ftabs");
  if (ftabs) {
    ftabs.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      var f = b.getAttribute("data-filter");
      $$("button", ftabs).forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      $$(".pgrid .pcard").forEach(function (c) { c.hidden = !(f === "all" || c.getAttribute("data-family") === f); });
    });
  }

  /* Product selector (rules mirror the manual's quick-selection table) */
  var sel = $("#selector");
  if (sel) {
    var out = $("#sel-out", sel), data = JSON.parse($("#sel-data").textContent);
    var render = function () {
      var app = (sel.querySelector("input[name=app]:checked") || {}).value;
      var sal = (sel.querySelector("input[name=sal]:checked") || {}).value;
      var foul = sel.querySelector("input[name=foul]") && sel.querySelector("input[name=foul]").checked;
      var salBox = $("#sal-box", sel);
      var needsSal = app === "ro";
      salBox.hidden = !needsSal;
      var picks = [];
      if (app === "ro") {
        if (!sal) { out.innerHTML = '<p class="placeholder">' + t("pickSal") + '</p>'; return; }
        if (sal === "1000") picks = [["hx-xlp", t("r_xlp")]];
        if (sal === "2000") picks = [["hx-lp", t("r_lp")]];
        if (sal === "5000") picks = foul ? [["hx-bwfr", t("r_bwfr_foul")]] : [["hx-bw", t("r_bw")], ["hx-bwfr", t("r_bwfr_opt")]];
        if (sal === "10000") picks = [["hx-sw", t("r_sw")]];
        if (sal === "mid") picks = [["hx-bwfr", t("r_mid1")], ["hx-sw", t("r_mid2")]];
      } else if (app === "dw") picks = [["hx-hq", t("r_hq")], ["hx-uf", t("r_uf_pre")]];
      else if (app === "sep") picks = [["hx-bm", t("r_bm")]];
      else if (app === "bio") picks = [["hx-mbr", t("r_mbr")]];
      else if (app === "uf") picks = [["hx-uf", t("r_uf")]];
      if (!picks.length) { out.innerHTML = '<p class="placeholder">' + t("pickApp") + '</p>'; return; }
      out.innerHTML = picks.map(function (p) {
        var d = data[p[0]];
        var chips = d.models.map(function (m, i) {
          var short = m.code.indexOf(d.code + "-") === 0 ? m.code.slice(d.code.length + 1) : m.code;
          var lab = short + (m.fmt && short.indexOf(m.fmt) !== 0 ? " · " + m.fmt : "");
          return '<button type="button" class="mchip" data-p="' + p[0] + '" data-m="' + i + '" aria-pressed="false">' + lab + '</button>';
        }).join("");
        return '<div class="rec-wrap"><a class="rec" href="' + d.url + '">' + (d.img ? '<img src="' + d.img + '" alt="" loading="lazy">' : '<span></span>') +
          '<span><b>' + d.code + '</b> <span class="small muted">' + d.name + '</span><span class="why">' + p[1] + '</span></span></a>' +
          '<div class="msel" role="group" aria-label="' + t("size") + ' ' + d.code + '"><span class="msel-l">3 · ' + t("size") + '</span>' + chips + '</div></div>';
      }).join("") + '<div id="model-out" aria-live="polite"></div><p class="sel-note">' + t("selNote") + ' <a href="../contact.html?type=Design%20review">' + t("review") + (LANG === "ar" ? ' ←' : ' →') + '</a></p>';
    };
    sel.addEventListener("change", render);
    sel.addEventListener("click", function (e) {
      var b = e.target.closest(".mchip"); if (!b) return;
      $$(".mchip", sel).forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      var d = data[b.getAttribute("data-p")], m = d.models[+b.getAttribute("data-m")];
      var q = "product=" + encodeURIComponent(d.code) + "&model=" + encodeURIComponent(m.code);
      var rows = m.det.map(function (r) { return '<div><dt>' + r[0] + '</dt><dd>' + r[1] + '</dd></div>'; }).join("");
      $("#model-out", sel).innerHTML = '<div class="model-panel"><p class="eyebrow">' + t("yourModel") + '</p><p class="model-code">' + m.code + '</p>' +
        '<dl class="model-dl">' + rows + '</dl>' + (d.test ? '<p class="sel-note">' + t("ratedAt") + ' ' + d.test + '</p>' : '') +
        '<p class="sel-note">' + t("sizingNote") + '</p>' +
        '<div class="btns"><a class="btn btn-dark" href="../contact.html?type=Quotation&' + q + '">' + t("quoteModel") + '</a>' +
        '<a class="btn btn-ghost" href="../contact.html?type=Design%20review&' + q + '">' + t("review") + '</a>' +
        '<a class="link" href="' + d.ds + '" download>' + t("datasheet") + '</a></div></div>';
      var mo = $("#model-out .model-panel", sel); if (mo && mo.scrollIntoView && window.innerWidth < 860) mo.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" });
    });
    render();
  }

  /* Lightbox for award certificates */
  var lb = $("#lb");
  if (lb) {
    var lbImg = $("img", lb), lbCap = $("p", lb), lbClose = $("button", lb), lastFocus;
    $$("[data-lb]").forEach(function (b) {
      b.addEventListener("click", function () {
        lastFocus = b;
        lbImg.src = b.getAttribute("data-lb"); lbImg.alt = b.getAttribute("data-alt") || "";
        lbCap.textContent = b.getAttribute("data-cap") || "";
        lb.classList.add("open"); lb.setAttribute("aria-hidden", "false"); lbClose.focus();
      });
    });
    var close = function () { lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); lbImg.src = ""; if (lastFocus) lastFocus.focus(); };
    lbClose.addEventListener("click", close);
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && lb.classList.contains("open")) close(); });
  }

  /* Editable content lists (certifications, customers) — see assets/js/content.js */
  var C = window.HUAXIN_CONTENT || {};
  $$("[data-certs]").forEach(function (slot) {
    var list = (C.certifications || []).filter(function (c) { return c && c.name; });
    var wrap = slot.closest("[data-certs-section]");
    if (!list.length) { if (wrap && wrap.hasAttribute("data-hide-empty")) wrap.hidden = true; return; }
    if (wrap) wrap.hidden = false;
    $$("[data-certs-empty]").forEach(function (n) { n.hidden = true; });
    var pre = slot.getAttribute("data-prefix") || "";
    slot.innerHTML = list.map(function (c) {
      return '<a class="dl" href="' + (c.file ? pre + c.file : "#") + '"' + (c.file ? ' download' : '') + '><span class="ic">CERT</span><span><b>' + c.name + '</b><span>' +
        [c.issuer, c.scope, c.valid ? "Valid until " + c.valid : ""].filter(Boolean).join(" · ") + '</span></span></a>';
    }).join("");
  });
  $$("[data-customers]").forEach(function (slot) {
    var list = (C.customers || []).filter(function (c) { return c && c.approved && c.logo; });
    var wrap = slot.closest("[data-customers-section]");
    if (!list.length) { if (wrap) wrap.hidden = true; return; }
    if (wrap) wrap.hidden = false;
    $$("[data-certs-empty]").forEach(function (n) { n.hidden = true; });
    var pre = slot.getAttribute("data-prefix") || "";
    slot.innerHTML = list.map(function (c) { return '<li><img src="' + pre + c.logo + '" alt="' + c.name + '" loading="lazy"></li>'; }).join("");
  });

  /* Inquiry form */
  var form = $("#inquiry");
  if (form) {
    var status = $(".form-status", form);
    var params = new URLSearchParams(window.location.search);
    if (params.get("product")) { var ps = $("#f-product", form); if (ps) ps.value = params.get("product"); }
    if (params.get("type")) { var ts = $("#f-type", form); if (ts) ts.value = params.get("type"); }
    if (params.get("model")) { var mf = $("#f-model", form); if (mf) mf.value = params.get("model"); }
    var rn = $("#review-note", form), ft = $("#f-type", form);
    var syncNote = function () { if (rn && ft) rn.hidden = ft.value !== "Design review"; };
    if (ft) ft.addEventListener("change", syncNote); syncNote();
    var show = function (cls, msg) { status.className = "form-status show " + cls; status.textContent = msg; status.focus(); };
    var validate = function () {
      var ok = true, first = null;
      $$(".field", form).forEach(function (f) {
        var inp = $("input,select,textarea", f); if (!inp) return;
        var bad = !inp.checkValidity();
        f.classList.toggle("invalid", bad);
        inp.setAttribute("aria-invalid", bad ? "true" : "false");
        if (bad && !first) first = inp;
        if (bad) ok = false;
      });
      var consent = $("#f-consent", form);
      if (consent && !consent.checked) { ok = false; first = first || consent; consent.closest(".check").classList.add("invalid"); }
      if (first) first.focus();
      return ok;
    };
    form.addEventListener("input", function (e) { var f = e.target.closest(".field"); if (f && e.target.checkValidity()) { f.classList.remove("invalid"); e.target.setAttribute("aria-invalid", "false"); } });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if ($("#f-website", form).value) return; // honeypot
      if (!validate()) { show("bad", t("formFix")); return; }
      var fd = new FormData(form);
      var endpoint = (window.HUAXIN_CONFIG || {}).formEndpoint;
      var btn = $("button[type=submit]", form);
      if (endpoint) {
        btn.disabled = true; btn.textContent = t("sending");
        fd.delete("website"); fd.delete("consent");
        fd.append("_subject", "HUAXIN website inquiry [" + LANG.toUpperCase() + "]: " + fd.get("type") + " — " + fd.get("company"));
        fd.append("_replyto", fd.get("email"));
        fd.append("_template", "table");
        var mail = (window.HUAXIN_CONFIG || {}).email || "service@huaxinmembrane.com";
        fetch(endpoint, { method: "POST", body: fd, headers: { Accept: "application/json" } })
          .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json().catch(function () { return {}; }); })
          .then(function (d) {
            // FormSubmit answers {success:"false"} until the address is activated; Formspree answers {ok:true}
            if (d && (d.success === false || d.success === "false" || d.ok === false)) throw new Error(d.message || "rejected");
            form.reset(); show("ok", t("formOk"));
          })
          .catch(function () { show("bad", t("formFail", mail)); })
          .then(function () { btn.disabled = false; btn.innerHTML = t("send") + ' <svg class="ic-arrow" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 8h13M9 3l5 5-5 5"/></svg>'; });
      } else {
        var lines = ["Inquiry type: " + fd.get("type"), "Name: " + fd.get("name"), "Company: " + fd.get("company"), "Email: " + fd.get("email"),
          "Country: " + fd.get("country"), "Product: " + (fd.get("product") || "-"), "Model: " + (fd.get("model") || "-"), "Application: " + (fd.get("application") || "-"), "", fd.get("message")];
        var to = (window.HUAXIN_CONFIG || {}).email || "service@huaxinmembrane.com";
        var href = "mailto:" + to + "?subject=" + encodeURIComponent("Website inquiry [" + LANG.toUpperCase() + "]: " + fd.get("type") + " — " + fd.get("company")) + "&body=" + encodeURIComponent(lines.join("\n"));
        window.location.href = href;
        show("info", t("mailto", to));
      }
    });
  }
})();
