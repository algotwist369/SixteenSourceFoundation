import { useEffect } from "react";

const GoogleTranslate = () => {
    useEffect(() => {
        const addScript = document.createElement("script");
        addScript.src =
            "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        document.body.appendChild(addScript);

        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: "en",
                    autoDisplay: true,
                    includedLanguages:
                        "en,hi,gu,mr,bn,ta,te,kn,ml,pa,ur,ne,ar,fr,de,es",
                },
                "google_translate_element"
            );
        };
    }, []);

    return (
        <div id="google_translate_element"></div>
    );
};

export default GoogleTranslate;
