"use client";

const CUSTOMER_KEY_NAME = "ayurvya_customer_id";

export function getOrCreateCustomerKey(): string {
  if (typeof window === "undefined") return "";

  let key = localStorage.getItem(CUSTOMER_KEY_NAME);
  // Ensure the customer ID is a valid PostgreSQL UUID format
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(key || "");

  if (!key || !isUuid) {
    key = crypto.randomUUID();
    localStorage.setItem(CUSTOMER_KEY_NAME, key);

    // Also set in document cookie for SSR availability
    document.cookie = `${CUSTOMER_KEY_NAME}=${key}; path=/; max-age=31536000; SameSite=Lax`;
  }
  return key;
}
