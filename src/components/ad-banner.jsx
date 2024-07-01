import { useEffect } from 'react';

const AdBanner = (props) => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <ins
            className="adsbygoogle adbanner-customize"
            style={{
                display: 'block',
                overflow: 'hidden',
            }}
            data-ad-client='ca-pub-9453424231422521'
            {...props}
        />
    );
};
export default AdBanner;