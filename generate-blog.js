export default id => `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Camille Automaton</title>
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="/styles/loading.css">
    <link rel="stylesheet" href="/styles/global.css">
    <link rel="stylesheet" href="https://fastly.jsdelivr.net/gh/tanpero/cdn@6/blog-article.css">
    <link rel="stylesheet" href="https://fastly.jsdelivr.net/gh/tanpero/cdn@5/露霞文楷/font.css">
    <link rel="stylesheet" href="https://fastly.jsdelivr.net/gh/tanpero/cdn@5/京华老宋体/font.css">
    <style>
        #content {
            font-family: 露霞文楷;
            line-height: 1.6;
            padding: 20px;
            padding-left: 120px;
            padding-right: 120px;
        }

        #title {
            text-align: center;
            text-indent: 0%;
        }

        #title h1 {
            font-family: 京华老宋体, SongTi;
        }
    </style>
    <script src="/scripts/starrysky.js"></script>
</head>
<body>
  <div class="_"><canvas id="background"></canvas></div>
  <div class="loader">
    <div class="pencil">
        <p>Loading...</p>
        <div class="top"></div>
    </div>
    <div class="stroke">
    </div>
  </div>
  <div id="content">
    <header>
        <!-- <h1>我的博客</h1>
        <nav>
            <ul>
                <li><a href="#">首页</a></li>
                <li><a href="#">文章归档</a></li>
                <li><a href="#">关于我</a></li>
            </ul>
        </nav> -->
    </header>

    <main>
        <article>
            <header id="title"></header>
            <main id="text"></main>
        </article>

        <aside>
            <!-- <h3>相关文章</h3>
            <ul>
                <li><a href="#">相关文章1</a></li>
                <li><a href="#">相关文章2</a></li>
                <li><a href="#">相关文章3</a></li>
            </ul> -->
        </aside>
    </main>

    <footer>
        <p>&copy; 2024 Camille Automaton</p>
    </footer>

    </div>

    <script>
        
        window.addEventListener("DOMContentLoaded", async () => {

            const contentContainer = document.querySelector('#text')

            const contentResponse = await fetch(\`/blogs/${id}/content\`)
            const contentHtml = await contentResponse.text()

            contentContainer.innerHTML = contentHtml

            const article = document.querySelector('article');
            if (article) {
                const h1 = article.querySelector('h1');
                if (h1) {
                    const header = article.querySelector('header');
                    header.appendChild(h1);

                    const p = document.createElement('p');
                    const i = document.createElement('i');
                    i.textContent = 'Camille Dolma';
                    const large = document.createElement('large');
                    large.innerHTML = '&nbsp;<span style="font-family: KaiTi">（糖糖）</span>';
                    p.appendChild(i);
                    p.appendChild(large);

                    header.insertBefore(p, h1.nextSibling);
                }
            }
            
            document.querySelector(".loader").style.display = "none"
            document.querySelector("#content").style.display = "block"

        })

    </script>

    <script>
        (() => {
            const canvas = document.getElementById('background');
            starrysky.init(canvas);
            starrysky.render();
            starrysky.setStarSpeedLevel(0.0005);
        })()
    </script>
    <script src="https://fastly.jsdelivr.net/gh/tanpero/auto-scroll@1/index.js"></script>
</body>
</html>`
