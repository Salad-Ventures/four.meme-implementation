// Allowed referrer domains
const allowedDomains = ["*.memeos.ai"];

// Function to check if the referrer is from an allowed domain
function isReferrerAllowed() {
  const referrer = document.referrer;
  try {
    const referrerDomain = new URL(referrer).hostname;
    return allowedDomains.some((domain) => referrerDomain.endsWith(domain));
  } catch (error) {
    console.warn("Referrer is not valid or unavailable:", referrer);
    return false; // Deny if referrer is invalid or unavailable
  }
}

// Parse URL parameters
function getUrlParams(url) {
  const params = new URL(url).searchParams;
  return {
    name: params.get("name"),
    shortName: params.get("symbol"),
    desc: params.get("description"),
    image: params.get("image"),
  };
}

// Function to set input/textarea values and trigger events
function setFieldValue(selector, value) {
  const field = document.querySelector(selector);
  if (field) {
    const nativeValueSetter = Object.getOwnPropertyDescriptor(
      field.tagName === "TEXTAREA"
        ? window.HTMLTextAreaElement.prototype
        : window.HTMLInputElement.prototype,
      "value"
    ).set;

    nativeValueSetter.call(field, decodeURIComponent(value));
    field.dispatchEvent(new Event("input", { bubbles: true }));
    field.dispatchEvent(new Event("change", { bubbles: true }));
  }
}

// Main function to populate form
function populateForm() {
  if (!isReferrerAllowed()) {
    console.warn("Referrer is not allowed. Exiting...");
    return;
  }

  const urlParams = getUrlParams(window.location.href);
  console.log("URL Parameters:", urlParams);

  // Populate text fields
  if (urlParams.name) {
    setFieldValue('input[name="name"]', urlParams.name);
  }
  if (urlParams.shortName) {
    setFieldValue('input[name="shortName"]', urlParams.shortName);
  }
  if (urlParams.desc) {
    setFieldValue('textarea[name="desc"]', urlParams.desc);
  }

  // Handle image upload
  if (urlParams.image) {
    fetch(decodeURIComponent(urlParams.image))
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], "token-image.png", { type: blob.type });
        const fileInput = document.querySelector('input[type="file"]');

        if (fileInput) {
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          fileInput.files = dataTransfer.files;
          fileInput.dispatchEvent(new Event("change", { bubbles: true }));
          console.log("Image uploaded:", file.name);
        }
      })
      .catch((error) => console.error("Image upload failed:", error));
  }
}

// Run when DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", populateForm);
} else {
  populateForm();
}
