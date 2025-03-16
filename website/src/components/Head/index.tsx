import NextHead from 'next/head';

const ogImage = 'https://sonner-js.huanfei.top/og.png';

const Head = () => (
    <NextHead>
        {/* Title */}
        <title>Sonner-JS</title>
        <meta name="og:title" content="Sonner-JS" />

        {/* Description */}
        <meta name="description" content="An opinionated toast component for Pure JS." />
        <meta name="og:description" content="An opinionated toast component for Pure JS." />

        {/* Image */}
        <meta name="twitter:image" content={ogImage} />
        <meta name="og:image" content={ogImage} />

        {/* URL */}
        <meta name="og:url" content="https://sonner-js.huanfei.top/" />

        {/* General */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@huanfe1" />
        <meta name="author" content="Hunafei" />

        {/* Favicons */}
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="shortcut icon" href="favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png" />
    </NextHead>
);

export default Head;
