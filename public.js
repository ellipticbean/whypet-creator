console.log("WhyPet public-release helpers loaded.");

const copyShareLinkButton =
    document.getElementById(
        "copy-share-link"
    );

const copyBuyLinkButton =
    document.getElementById(
        "copy-buy-link"
    );

const releaseStatus =
    document.getElementById(
        "release-status"
    );

const publicPage =
    document.getElementById(
        "public-page"
    );

const creator =
    document.getElementById(
        "creator"
    );


function setReleaseStatus(message) {

    if (!releaseStatus) {

        return;
    }


    releaseStatus.textContent =
        message;
}


async function copyText(
    text,
    successMessage
) {

    try {

        await navigator.clipboard.writeText(
            text
        );


        setReleaseStatus(
            successMessage
        );


    } catch (error) {

        /*
            Clipboard permission is not guaranteed on
            every browser/hosting setup.

            prompt() gives the user a reliable fallback.
        */

        window.prompt(
            "Copy this link:",
            text
        );


        setReleaseStatus(
            "Your browser blocked automatic copying, so the link was opened in a copy box instead."
        );
    }
}


function buildShareUrl() {

    if (
        typeof buildWhyPetDescription !==
        "function"
    ) {

        return null;
    }


    const desc =
        buildWhyPetDescription();


    if (!desc) {

        return null;
    }


    const url =
        new URL(
            window.location.href
        );


    /*
        Remove unrelated query parameters and store only
        the WhyPet description. Opening this URL rebuilds
        the pet through the existing desc loader.
    */

    url.search = "";

    url.searchParams.set(
        "desc",
        desc
    );


    return url.toString();
}


if (copyShareLinkButton) {

    copyShareLinkButton.addEventListener(
        "click",
        function () {

            const url =
                buildShareUrl();


            if (!url) {

                setReleaseStatus(
                    "Build a pet first, then try again."
                );

                return;
            }


            copyText(
                url,
                "Pet share link copied."
            );
        }
    );
}


if (copyBuyLinkButton) {

    copyBuyLinkButton.addEventListener(
        "click",
        function () {

            if (
                typeof getWhyPetBuyUrl !==
                "function"
            ) {

                setReleaseStatus(
                    "The Whyville buy-link helper is unavailable."
                );

                return;
            }


            const url =
                getWhyPetBuyUrl();


            if (!url) {

                setReleaseStatus(
                    "Build a pet first, then try again."
                );

                return;
            }


            copyText(
                url,
                "Official Whyville Buy Pets link copied."
            );
        }
    );
}


// ====================================================
// NARROW-SCREEN DISPLAY SUPPORT
// ====================================================

function updatePublicCreatorScale() {

    if (
        !creator ||
        !publicPage
    ) {

        return;
    }


    const availableWidth =
        publicPage.clientWidth;


    const scale =
        Math.min(
            1,
            availableWidth / 640
        );


    document.documentElement.style.setProperty(
        "--creator-mobile-scale",
        String(scale)
    );


    /*
        CSS transforms do not change layout height.
        Use a negative bottom margin to remove the unused
        space created when the 380px creator is scaled down.
    */

    creator.style.marginBottom =
        `${
            40 -
            (380 * (1 - scale))
        }px`;
}


window.addEventListener(
    "resize",
    updatePublicCreatorScale
);


updatePublicCreatorScale();
