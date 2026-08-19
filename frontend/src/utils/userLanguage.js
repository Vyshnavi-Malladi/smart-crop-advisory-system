// src/utils/userLanguage.js

import Cookies from "js-cookie";


// ============================================================
// GET CURRENT LOGGED-IN USER
// ============================================================

export const getCurrentUser = () => {

  try {

    const userCookie =
      Cookies.get("user");


    if (!userCookie) {

      return null;

    }


    return JSON.parse(
      userCookie
    );

  } catch (error) {

    console.error(
      "Unable to read current user:",
      error
    );

    return null;

  }

};


// ============================================================
// GET CURRENT USER ID
// ============================================================

export const getCurrentUserId = () => {

  const user =
    getCurrentUser();


  if (!user) {

    return null;

  }


  /*
   * Use the unique ID from your user object.
   *
   * Usually MongoDB users have "_id".
   *
   * The other options are fallbacks in case your
   * user object uses a different property.
   */

  const userId =
    user._id ||
    user.id ||
    user.userId ||
    user.email;


  if (!userId) {

    console.warn(
      "No unique user ID found in user cookie."
    );

    return null;

  }


  return String(
    userId
  );

};


// ============================================================
// USER-SPECIFIC LANGUAGE KEY
// ============================================================

export const getUserLanguageKey = () => {

  const userId =
    getCurrentUserId();


  if (!userId) {

    return null;

  }


  return `farmxpert_language_${userId}`;

};


// ============================================================
// SAVE LANGUAGE FOR CURRENT USER
// ============================================================

export const saveUserLanguage = (
  language
) => {

  const key =
    getUserLanguageKey();


  if (!key) {

    console.warn(
      "Cannot save language because no logged-in user was found."
    );

    return;

  }


  localStorage.setItem(
    key,
    language
  );

};


// ============================================================
// GET LANGUAGE FOR CURRENT USER
// ============================================================

export const getUserLanguage = () => {

  const key =
    getUserLanguageKey();


  if (!key) {

    return null;

  }


  return localStorage.getItem(
    key
  );

};


// ============================================================
// USER-SPECIFIC TOUR COMPLETED KEY
// ============================================================

export const getUserTourCompletedKey =
  () => {

    const userId =
      getCurrentUserId();


    if (!userId) {

      return null;

    }


    return `farmxpert_tour_completed_${userId}`;

  };


// ============================================================
// USER-SPECIFIC TOUR SKIPPED KEY
// ============================================================

export const getUserTourSkippedKey =
  () => {

    const userId =
      getCurrentUserId();


    if (!userId) {

      return null;

    }


    return `farmxpert_tour_skipped_${userId}`;

  };


// ============================================================
// USER-SPECIFIC ONBOARDING COMPLETED KEY
//
// This is different from the tour-completed key.
//
// It tells us that the user has already gone through
// or skipped the initial onboarding.
//
// Therefore, old users will NOT see the language card
// or guided tour automatically every time they log in.
// ============================================================

export const getUserOnboardingKey = () => {

  const userId =
    getCurrentUserId();


  if (!userId) {

    return null;

  }


  return `farmxpert_onboarding_completed_${userId}`;

};


// ============================================================
// CHECK WHETHER CURRENT USER COMPLETED ONBOARDING
// ============================================================

export const hasCompletedOnboarding = () => {

  const key =
    getUserOnboardingKey();


  if (!key) {

    return false;

  }


  return (
    localStorage.getItem(
      key
    ) === "true"
  );

};


// ============================================================
// MARK CURRENT USER'S ONBOARDING AS COMPLETED
// ============================================================

export const markOnboardingCompleted = () => {

  const key =
    getUserOnboardingKey();


  if (!key) {

    console.warn(
      "Cannot mark onboarding as completed because no logged-in user was found."
    );

    return;

  }


  localStorage.setItem(
    key,
    "true"
  );

};


// ============================================================
// RESET CURRENT USER'S ONBOARDING
//
// Use this only if you intentionally want to show the
// language card + onboarding again for the current user.
// ============================================================

export const resetUserOnboarding = () => {

  const onboardingKey =
    getUserOnboardingKey();


  const completedKey =
    getUserTourCompletedKey();


  const skippedKey =
    getUserTourSkippedKey();


  if (onboardingKey) {

    localStorage.removeItem(
      onboardingKey
    );

  }


  if (completedKey) {

    localStorage.removeItem(
      completedKey
    );

  }


  if (skippedKey) {

    localStorage.removeItem(
      skippedKey
    );

  }

};


// ============================================================
// CLEAR ONLY THE CURRENT USER'S LANGUAGE
//
// This does NOT affect other users.
// ============================================================

export const clearUserLanguage = () => {

  const key =
    getUserLanguageKey();


  if (!key) {

    return;

  }


  localStorage.removeItem(
    key
  );

};


// ============================================================
// OPTIONAL: REMOVE OLD GLOBAL LANGUAGE KEYS
//
// These were used by the previous implementation.
// They are NOT used anymore.
//
// You can call this once if your browser still has the
// old global language values.
// ============================================================

export const removeOldGlobalLanguageKeys = () => {

  localStorage.removeItem(
    "farmxpert_language"
  );


  localStorage.removeItem(
    "preferred-language"
  );


  localStorage.removeItem(
    "farmxpert_language_selected"
  );


  localStorage.removeItem(
    "i18nextLng"
  );

};