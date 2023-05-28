*Widget Front End (created with [PREACT](https://preactjs.com/) )*

# Get started
- `npm install`
- `cp .env_example .env`
- Edit `.env`
- `npm run build`
- `npm run start`


```javascript
<script defer>
        (function (w, d, s, o, f, js, fjs) {
            w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments) };
            js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];
            js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs);
        }(window, document, 'script', 'ut', './widget.js'));
        ut('init', { debug: true });
    </script>
```

