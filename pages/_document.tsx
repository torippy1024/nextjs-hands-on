import Document, {Html, Head, Main, NextScript} from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang='ja'>
        <Head>
          <meta charSet='utf-8' />
          <meta name='format-detection' content='telephone=no' />

          <meta property='og:site_name' content='og:site_name' />
          <meta property='og:title' content='og:title' />
          <meta property='og:description' content='og:description' />
          <meta property='og:type' content='website' />
          <meta property='og:url' content='og:url' />
          <meta property='og:image' content='https://shima-usa.net/web-template/icon.png' />
          <meta name='twitter:card' content='summary' />
          <meta name='twitter:site' content='https://shima-usa.net' />
          <meta name='twitter:image' content='https://shima-usa.net/web-template/icon.png' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;