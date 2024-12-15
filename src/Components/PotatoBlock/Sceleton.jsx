import React from 'react';
import ContentLoader from 'react-content-loader';

const Sceleton = (props) => (
    <ContentLoader
        className="potato-block"
        speed={2}
        width={280}
        height={450}
        viewBox="0 0 280 450"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}>
        <circle cx="130" cy="130" r="130" />
        <rect x="0" y="266" rx="20" ry="20" width="280" height="26" />
        <rect x="0" y="296" rx="50" ry="50" width="280" height="88" />
        <rect x="0" y="388" rx="50" ry="50" width="77" height="45" />
        <rect x="130" y="388" rx="50" ry="50" width="150" height="45" />
    </ContentLoader>
);

export default Sceleton;
