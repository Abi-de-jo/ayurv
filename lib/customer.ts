"use client";

const CUSTOMER_KEY_NAME = "ayurvya_customer_key";

export function getOrCreateCustomerKey(): string {
  if (typeof window === "undefined") return "";

  let key = localStorage.getItem(CUSTOMER_KEY_NAME);
  if (!key || !key.startsWith("AYUR-CUST-")) {
    const randomHex = Math.random().toString(36).substring(2, 10).toUpperCase();
    key = `AYUR-CUST-${randomHex}`;
    localStorage.setItem(CUSTOMER_KEY_NAME, key);

    // Also set in document cookie for SSR availability
    document.cookie = `${CUSTOMER_KEY_NAME}=${key}; path=/; max-age=31536000; SameSite=Lax`;
  }
  return key;
}
