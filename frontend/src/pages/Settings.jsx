// src/pages/Settings.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  Lock,
  Mail,
  Phone,
  Bell,
  Trash2,
  Eye,
  EyeOff,
  Save,
  ShieldCheck,
  ArrowLeft,
  Loader2,
  User,
  MapPin,
  Sprout,
  CheckCircle2
} from "lucide-react";

import { toast } from "react-toastify";
import Cookies from "js-cookie";

import api from "../api";


// ============================================================
// PASSWORD FIELD
// ============================================================
// IMPORTANT:
// This component MUST remain outside Settings().
// Otherwise React recreates the component on every keystroke,
// causing the input to lose focus after typing one character.
// ============================================================

const PasswordField = ({
  name,
  value,
  placeholder,
  visible,
  setVisible,
  onChange,
  showPasswordText,
  hidePasswordText
}) => {

  return (
    <div className="relative">

      {/* Lock Icon */}

      <Lock
        size={17}
        strokeWidth={2}
        className="
          pointer-events-none
          absolute
          left-3.5
          top-1/2
          -translate-y-1/2
          text-gray-400
        "
      />


      {/* Password Input */}

      <input
        type={
          visible
            ? "text"
            : "password"
        }
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="new-password"
        className="
          h-[48px]
          w-full
          rounded-xl
          border
          border-[#e3e9e5]
          bg-[#fafcfb]
          pl-11
          pr-11
          text-[14px]
          text-[#26352f]
          outline-none
          transition-all
          duration-200
          placeholder:text-gray-400
          focus:border-[#087443]
          focus:bg-white
          focus:ring-4
          focus:ring-[#087443]/10
        "
      />


      {/* Show / Hide Button */}

      <button
        type="button"
        onClick={() =>
          setVisible(
            (previous) => !previous
          )
        }
        aria-label={
          visible
            ? hidePasswordText
            : showPasswordText
        }
        className="
          absolute
          right-3.5
          top-1/2
          -translate-y-1/2
          text-gray-400
          transition-colors
          hover:text-[#087443]
        "
      >

        {visible ? (
          <EyeOff size={17} />
        ) : (
          <Eye size={17} />
        )}

      </button>

    </div>
  );
};


// ============================================================
// SETTINGS PAGE
// ============================================================

export default function Settings() {

  const navigate = useNavigate();

  const { t } = useTranslation();


  // ==========================================================
  // USER DATA
  // ==========================================================

  const [user, setUser] =
    useState(null);

  const [loadingUser, setLoadingUser] =
    useState(true);


  // ==========================================================
  // PASSWORD DATA
  // ==========================================================

  const [passwordData, setPasswordData] =
    useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });


  const [showCurrent, setShowCurrent] =
    useState(false);

  const [showNew, setShowNew] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);


  const [changingPassword, setChangingPassword] =
    useState(false);


  // ==========================================================
  // NOTIFICATIONS
  // ==========================================================

  const [notifications, setNotifications] =
    useState(true);

  const [updatingNotifications, setUpdatingNotifications] =
    useState(false);


  // ==========================================================
  // DELETE ACCOUNT
  // ==========================================================

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [deleteLoading, setDeleteLoading] =
    useState(false);


  // ==========================================================
  // LOAD USER
  // ==========================================================

  useEffect(() => {

    fetchUser();

  }, []);


  // ==========================================================
  // FETCH CURRENT USER
  // ==========================================================

  const fetchUser = async () => {

    try {

      setLoadingUser(true);


      const { data } =
        await api.get(
          "/auth/me"
        );


      if (
        data?.success &&
        data?.user
      ) {

        setUser(
          data.user
        );


        setNotifications(
          data.user.notificationsEnabled !== false
        );


        Cookies.set(
          "user",
          JSON.stringify(
            data.user
          ),
          {
            expires: 7,
            sameSite: "lax"
          }
        );

      }

    } catch (error) {

      console.error(
        "Unable to load user:",
        error
      );


      if (
        error.response?.status === 401
      ) {

        Cookies.remove(
          "token"
        );

        Cookies.remove(
          "user"
        );

        window.location.href =
          "/login";

        return;

      }


      toast.error(
        error.response?.data?.msg ||
        t(
          "settings.messages.loadError"
        )
      );

    } finally {

      setLoadingUser(false);

    }

  };


  // ==========================================================
  // PASSWORD INPUT CHANGE
  // ==========================================================

  const handlePasswordChange = (
    e
  ) => {

    const {
      name,
      value
    } = e.target;


    setPasswordData(
      (previous) => ({
        ...previous,
        [name]: value
      })
    );

  };


  // ==========================================================
  // CHANGE PASSWORD
  // ==========================================================

  const changePassword = async (
    e
  ) => {

    e.preventDefault();


    const {
      currentPassword,
      newPassword,
      confirmPassword
    } = passwordData;


    // --------------------------------------------------------
    // CURRENT PASSWORD
    // --------------------------------------------------------

    if (
      !currentPassword.trim()
    ) {

      toast.error(
        t(
          "settings.messages.currentPasswordRequired"
        )
      );

      return;

    }


    // --------------------------------------------------------
    // NEW PASSWORD
    // --------------------------------------------------------

    if (
      !newPassword.trim()
    ) {

      toast.error(
        t(
          "settings.messages.newPasswordRequired"
        )
      );

      return;

    }


    // --------------------------------------------------------
    // PASSWORD LENGTH
    // --------------------------------------------------------

    if (
      newPassword.length < 6
    ) {

      toast.error(
        t(
          "settings.messages.passwordMinLength"
        )
      );

      return;

    }


    // --------------------------------------------------------
    // CONFIRM PASSWORD
    // --------------------------------------------------------

    if (
      !confirmPassword.trim()
    ) {

      toast.error(
        t(
          "settings.messages.confirmPasswordRequired"
        )
      );

      return;

    }


    // --------------------------------------------------------
    // PASSWORD MATCH
    // --------------------------------------------------------

    if (
      newPassword !==
      confirmPassword
    ) {

      toast.error(
        t(
          "settings.messages.passwordMismatch"
        )
      );

      return;

    }


    try {

      setChangingPassword(
        true
      );


      const { data } =
        await api.put(
          "/auth/change-password",
          {
            currentPassword,
            newPassword
          }
        );


      if (
        data?.success
      ) {

        toast.success(
          data.msg ||
          t(
            "settings.messages.passwordChanged"
          )
        );


        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        });


        setShowCurrent(
          false
        );

        setShowNew(
          false
        );

        setShowConfirm(
          false
        );

      }

    } catch (error) {

      console.error(
        "Change password error:",
        error
      );


      toast.error(
        error.response?.data?.msg ||
        t(
          "settings.messages.passwordChangeError"
        )
      );

    } finally {

      setChangingPassword(
        false
      );

    }

  };


  // ==========================================================
  // NOTIFICATION TOGGLE
  // ==========================================================

  const handleNotificationToggle =
    async () => {

      const newValue =
        !notifications;


      try {

        setUpdatingNotifications(
          true
        );


        const { data } =
          await api.put(
            "/auth/notifications",
            {
              enabled: newValue
            }
          );


        if (
          data?.success
        ) {

          const updatedValue =
            data.notificationsEnabled;


          setNotifications(
            updatedValue
          );


          setUser(
            (previous) => ({
              ...previous,
              notificationsEnabled:
                updatedValue
            })
          );


          const currentUser =
            user || {};


          Cookies.set(
            "user",
            JSON.stringify({
              ...currentUser,
              notificationsEnabled:
                updatedValue
            }),
            {
              expires: 7,
              sameSite: "lax"
            }
          );


          toast.success(
            data.msg ||
            (
              updatedValue
                ? t(
                    "settings.messages.notificationsEnabled"
                  )
                : t(
                    "settings.messages.notificationsDisabled"
                  )
            )
          );

        }

      } catch (error) {

        console.error(
          "Notification update error:",
          error
        );


        toast.error(
          error.response?.data?.msg ||
          t(
            "settings.messages.notificationError"
          )
        );

      } finally {

        setUpdatingNotifications(
          false
        );

      }

    };


  // ==========================================================
  // DELETE ACCOUNT
  // ==========================================================

  const deleteAccount = async () => {

    try {

      setDeleteLoading(
        true
      );


      const { data } =
        await api.delete(
          "/auth/delete-account"
        );


      if (
        data?.success
      ) {

        Cookies.remove(
          "token"
        );

        Cookies.remove(
          "user"
        );


        toast.success(
          data.msg ||
          t(
            "settings.messages.accountDeleted"
          )
        );


        setShowDeleteModal(
          false
        );


        setTimeout(
          () => {

            window.location.href =
              "/login";

          },
          700
        );

      }

    } catch (error) {

      console.error(
        "Delete account error:",
        error
      );


      toast.error(
        error.response?.data?.msg ||
        t(
          "settings.messages.deleteError"
        )
      );

    } finally {

      setDeleteLoading(
        false
      );

    }

  };


  // ==========================================================
  // LOADING SCREEN
  // ==========================================================

  if (
    loadingUser
  ) {

    return (

      <div
        className="
          min-h-screen
          bg-[#f5f7f6]
          flex
          items-center
          justify-center
        "
      >

        <div
          className="
            flex
            flex-col
            items-center
            gap-3
          "
        >

          <Loader2
            size={32}
            className="
              animate-spin
              text-[#087443]
            "
          />


          <p
            className="
              text-[14px]
              text-gray-500
            "
          >
            {t(
              "settings.loading"
            )}
          </p>

        </div>

      </div>

    );

  }


  // ==========================================================
  // MAIN
  // ==========================================================

  return (

    <div
      className="
        min-h-screen
        bg-[#f5f7f6]
        px-5
        py-7
        md:px-8
        lg:px-10
      "
    >

      <div
        className="
          mx-auto
          max-w-[1080px]
        "
      >


        {/* ==================================================
            HEADER
        ================================================== */}

        <div
          className="
            mb-8
            flex
            flex-col
            gap-5
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <div
              className="
                flex
                h-[46px]
                w-[46px]
                items-center
                justify-center
                rounded-xl
                bg-[#e7f0eb]
                text-[#087443]
              "
            >

              <ShieldCheck
                size={23}
              />

            </div>


            <div>

              <h1
                className="
                  text-[27px]
                  font-bold
                  leading-tight
                  tracking-[-0.5px]
                  text-[#172c25]
                "
              >
                {t(
                  "settings.title"
                )}
              </h1>


              <p
                className="
                  mt-1
                  text-[14px]
                  text-gray-500
                "
              >
                {t(
                  "settings.subtitle"
                )}
              </p>

            </div>

          </div>


          <button
            type="button"
            onClick={() =>
              navigate(
                "/dashboard"
              )
            }
            className="
              flex
              h-[42px]
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-[#dfe6e1]
              bg-white
              px-4
              text-[13px]
              font-semibold
              text-[#53635c]
              shadow-[0_3px_12px_rgba(20,50,35,0.04)]
              transition-all
              duration-200
              hover:border-[#cbd8d0]
              hover:bg-[#fafcfb]
              hover:text-[#087443]
            "
          >

            <ArrowLeft
              size={16}
            />

            {t(
              "settings.dashboard"
            )}

          </button>

        </div>


        <div
          className="
            space-y-5
          "
        >


          {/* ==================================================
              ACCOUNT INFORMATION
          ================================================== */}

          <section
            className="
              overflow-hidden
              rounded-[18px]
              border
              border-[#e2e8e4]
              bg-white
              shadow-[0_4px_20px_rgba(20,50,35,0.045)]
            "
          >

            <div
              className="
                flex
                items-center
                gap-3.5
                border-b
                border-[#edf0ee]
                px-6
                py-5
              "
            >

              <div
                className="
                  flex
                  h-[40px]
                  w-[40px]
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#edf4f0]
                  text-[#087443]
                "
              >

                <User
                  size={19}
                />

              </div>


              <div>

                <h2
                  className="
                    text-[17px]
                    font-bold
                    text-[#1c2f27]
                  "
                >
                  {t(
                    "settings.accountInformation.title"
                  )}
                </h2>


                <p
                  className="
                    mt-0.5
                    text-[13px]
                    text-gray-500
                  "
                >
                  {t(
                    "settings.accountInformation.subtitle"
                  )}
                </p>

              </div>

            </div>


            <div
              className="
                grid
                gap-4
                p-6
                md:grid-cols-2
              "
            >


              {/* NAME */}

              <div
                className="
                  rounded-xl
                  border
                  border-[#edf1ee]
                  bg-[#fafcfb]
                  p-4
                "
              >

                <div
                  className="
                    mb-2
                    flex
                    items-center
                    gap-2
                  "
                >

                  <User
                    size={16}
                    className="text-[#087443]"
                  />

                  <span
                    className="
                      text-[11px]
                      font-bold
                      uppercase
                      tracking-[0.08em]
                      text-gray-400
                    "
                  >
                    {t(
                      "settings.accountInformation.name"
                    )}
                  </span>

                </div>


                <p
                  className="
                    text-[15px]
                    font-semibold
                    text-[#34433d]
                  "
                >
                  {user?.name ||
                    t(
                      "settings.notAvailable"
                    )}
                </p>

              </div>


              {/* EMAIL */}

              <div
                className="
                  rounded-xl
                  border
                  border-[#edf1ee]
                  bg-[#fafcfb]
                  p-4
                "
              >

                <div
                  className="
                    mb-2
                    flex
                    items-center
                    gap-2
                  "
                >

                  <Mail
                    size={16}
                    className="text-[#087443]"
                  />

                  <span
                    className="
                      text-[11px]
                      font-bold
                      uppercase
                      tracking-[0.08em]
                      text-gray-400
                    "
                  >
                    {t(
                      "settings.accountInformation.email"
                    )}
                  </span>

                </div>


                <p
                  className="
                    break-all
                    text-[15px]
                    font-semibold
                    text-[#34433d]
                  "
                >
                  {user?.email ||
                    t(
                      "settings.notAvailable"
                    )}
                </p>

              </div>


              {/* PHONE */}

              <div
                className="
                  rounded-xl
                  border
                  border-[#edf1ee]
                  bg-[#fafcfb]
                  p-4
                "
              >

                <div
                  className="
                    mb-2
                    flex
                    items-center
                    gap-2
                  "
                >

                  <Phone
                    size={16}
                    className="text-[#087443]"
                  />

                  <span
                    className="
                      text-[11px]
                      font-bold
                      uppercase
                      tracking-[0.08em]
                      text-gray-400
                    "
                  >
                    {t(
                      "settings.accountInformation.phone"
                    )}
                  </span>

                </div>


                <p
                  className="
                    text-[15px]
                    font-semibold
                    text-[#34433d]
                  "
                >
                  {user?.phone ||
                    t(
                      "settings.notAvailable"
                    )}
                </p>

              </div>


              {/* LOCATION */}

              <div
                className="
                  rounded-xl
                  border
                  border-[#edf1ee]
                  bg-[#fafcfb]
                  p-4
                "
              >

                <div
                  className="
                    mb-2
                    flex
                    items-center
                    gap-2
                  "
                >

                  <MapPin
                    size={16}
                    className="text-[#087443]"
                  />

                  <span
                    className="
                      text-[11px]
                      font-bold
                      uppercase
                      tracking-[0.08em]
                      text-gray-400
                    "
                  >
                    {t(
                      "settings.accountInformation.location"
                    )}
                  </span>

                </div>


                <p
                  className="
                    text-[15px]
                    font-semibold
                    text-[#34433d]
                  "
                >
                  {user?.location ||
                    t(
                      "settings.notAvailable"
                    )}
                </p>

              </div>


              {/* LAND AREA */}

              <div
                className="
                  rounded-xl
                  border
                  border-[#edf1ee]
                  bg-[#fafcfb]
                  p-4
                "
              >

                <div
                  className="
                    mb-2
                    flex
                    items-center
                    gap-2
                  "
                >

                  <Sprout
                    size={16}
                    className="text-[#087443]"
                  />

                  <span
                    className="
                      text-[11px]
                      font-bold
                      uppercase
                      tracking-[0.08em]
                      text-gray-400
                    "
                  >
                    {t(
                      "settings.accountInformation.landArea"
                    )}
                  </span>

                </div>


                <p
                  className="
                    text-[15px]
                    font-semibold
                    text-[#34433d]
                  "
                >

                  {
                    user?.landArea !== undefined &&
                    user?.landArea !== null
                      ? `${user.landArea} ${t(
                          "settings.accountInformation.acres"
                        )}`
                      : t(
                          "settings.notAvailable"
                        )
                  }

                </p>

              </div>


              {/* ACCOUNT TYPE */}

              <div
                className="
                  rounded-xl
                  border
                  border-[#edf1ee]
                  bg-[#fafcfb]
                  p-4
                "
              >

                <div
                  className="
                    mb-2
                    flex
                    items-center
                    gap-2
                  "
                >

                  <ShieldCheck
                    size={16}
                    className="text-[#087443]"
                  />

                  <span
                    className="
                      text-[11px]
                      font-bold
                      uppercase
                      tracking-[0.08em]
                      text-gray-400
                    "
                  >
                    {t(
                      "settings.accountInformation.accountType"
                    )}
                  </span>

                </div>


                <p
                  className="
                    text-[15px]
                    font-semibold
                    capitalize
                    text-[#34433d]
                  "
                >

                  {
                    user?.role === "admin"
                      ? t(
                          "settings.accountInformation.admin"
                        )
                      : t(
                          "settings.accountInformation.user"
                        )
                  }

                </p>

              </div>

            </div>

          </section>


          {/* ==================================================
              CHANGE PASSWORD
          ================================================== */}

          <section
            className="
              overflow-hidden
              rounded-[18px]
              border
              border-[#e2e8e4]
              bg-white
              shadow-[0_4px_20px_rgba(20,50,35,0.045)]
            "
          >

            <div
              className="
                flex
                items-center
                gap-3.5
                border-b
                border-[#edf0ee]
                px-6
                py-5
              "
            >

              <div
                className="
                  flex
                  h-[40px]
                  w-[40px]
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#edf4f0]
                  text-[#087443]
                "
              >

                <Lock
                  size={19}
                />

              </div>


              <div>

                <h2
                  className="
                    text-[17px]
                    font-bold
                    text-[#1c2f27]
                  "
                >
                  {t(
                    "settings.changePassword.title"
                  )}
                </h2>


                <p
                  className="
                    mt-0.5
                    text-[13px]
                    text-gray-500
                  "
                >
                  {t(
                    "settings.changePassword.subtitle"
                  )}
                </p>

              </div>

            </div>


            <form
              onSubmit={
                changePassword
              }
              className="p-6"
            >

              <div
                className="
                  grid
                  gap-5
                  md:grid-cols-3
                "
              >


                {/* CURRENT PASSWORD */}

                <div>

                  <label
                    className="
                      mb-2
                      block
                      text-[13px]
                      font-semibold
                      text-[#46554e]
                    "
                  >
                    {t(
                      "settings.changePassword.currentPassword"
                    )}
                  </label>


                  <PasswordField
                    name="currentPassword"
                    value={
                      passwordData.currentPassword
                    }
                    placeholder={t(
                      "settings.changePassword.currentPlaceholder"
                    )}
                    visible={
                      showCurrent
                    }
                    setVisible={
                      setShowCurrent
                    }
                    onChange={
                      handlePasswordChange
                    }
                    showPasswordText={t(
                      "settings.changePassword.showPassword"
                    )}
                    hidePasswordText={t(
                      "settings.changePassword.hidePassword"
                    )}
                  />

                </div>


                {/* NEW PASSWORD */}

                <div>

                  <label
                    className="
                      mb-2
                      block
                      text-[13px]
                      font-semibold
                      text-[#46554e]
                    "
                  >
                    {t(
                      "settings.changePassword.newPassword"
                    )}
                  </label>


                  <PasswordField
                    name="newPassword"
                    value={
                      passwordData.newPassword
                    }
                    placeholder={t(
                      "settings.changePassword.newPlaceholder"
                    )}
                    visible={
                      showNew
                    }
                    setVisible={
                      setShowNew
                    }
                    onChange={
                      handlePasswordChange
                    }
                    showPasswordText={t(
                      "settings.changePassword.showPassword"
                    )}
                    hidePasswordText={t(
                      "settings.changePassword.hidePassword"
                    )}
                  />

                </div>


                {/* CONFIRM PASSWORD */}

                <div>

                  <label
                    className="
                      mb-2
                      block
                      text-[13px]
                      font-semibold
                      text-[#46554e]
                    "
                  >
                    {t(
                      "settings.changePassword.confirmPassword"
                    )}
                  </label>


                  <PasswordField
                    name="confirmPassword"
                    value={
                      passwordData.confirmPassword
                    }
                    placeholder={t(
                      "settings.changePassword.confirmPlaceholder"
                    )}
                    visible={
                      showConfirm
                    }
                    setVisible={
                      setShowConfirm
                    }
                    onChange={
                      handlePasswordChange
                    }
                    showPasswordText={t(
                      "settings.changePassword.showPassword"
                    )}
                    hidePasswordText={t(
                      "settings.changePassword.hidePassword"
                    )}
                  />

                </div>

              </div>


              {/* PASSWORD BOTTOM */}

              <div
                className="
                  mt-5
                  flex
                  flex-col
                  gap-4
                  border-t
                  border-[#edf0ee]
                  pt-5
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >

                  <CheckCircle2
                    size={15}
                    className="text-[#087443]"
                  />

                  <p
                    className="
                      text-[12px]
                      text-gray-500
                    "
                  >
                    {t(
                      "settings.changePassword.passwordHint"
                    )}
                  </p>

                </div>


                <button
                  type="submit"
                  disabled={
                    changingPassword
                  }
                  className="
                    flex
                    h-[43px]
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#087443]
                    px-5
                    text-[13px]
                    font-semibold
                    text-white
                    shadow-[0_5px_14px_rgba(8,116,67,0.16)]
                    transition-all
                    duration-200
                    hover:-translate-y-[1px]
                    hover:bg-[#076538]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >

                  {changingPassword ? (

                    <>

                      <Loader2
                        size={16}
                        className="animate-spin"
                      />

                      {t(
                        "settings.changePassword.updating"
                      )}

                    </>

                  ) : (

                    <>

                      <Save
                        size={16}
                      />

                      {t(
                        "settings.changePassword.button"
                      )}

                    </>

                  )}

                </button>

              </div>

            </form>

          </section>


          {/* ==================================================
              NOTIFICATIONS
          ================================================== */}

          <section
            className="
              overflow-hidden
              rounded-[18px]
              border
              border-[#e2e8e4]
              bg-white
              shadow-[0_4px_20px_rgba(20,50,35,0.045)]
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
                gap-5
                px-6
                py-5
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-3.5
                "
              >

                <div
                  className="
                    flex
                    h-[40px]
                    w-[40px]
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#edf4f0]
                    text-[#087443]
                  "
                >

                  <Bell
                    size={19}
                  />

                </div>


                <div>

                  <h2
                    className="
                      text-[17px]
                      font-bold
                      text-[#1c2f27]
                    "
                  >
                    {t(
                      "settings.notifications.title"
                    )}
                  </h2>


                  <p
                    className="
                      mt-0.5
                      text-[13px]
                      text-gray-500
                    "
                  >
                    {t(
                      "settings.notifications.subtitle"
                    )}
                  </p>

                </div>

              </div>


              <button
                type="button"
                onClick={
                  handleNotificationToggle
                }
                disabled={
                  updatingNotifications
                }
                aria-label={t(
                  "settings.notifications.toggle"
                )}
                className={`
                  relative
                  h-[28px]
                  w-[50px]
                  shrink-0
                  rounded-full
                  transition-all
                  duration-200
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  ${
                    notifications
                      ? "bg-[#087443]"
                      : "bg-[#cdd5d0]"
                  }
                `}
              >

                {updatingNotifications ? (

                  <span
                    className="
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-center
                    "
                  >

                    <Loader2
                      size={14}
                      className="
                        animate-spin
                        text-white
                      "
                    />

                  </span>

                ) : (

                  <span
                    className={`
                      absolute
                      top-[4px]
                      h-[20px]
                      w-[20px]
                      rounded-full
                      bg-white
                      shadow-[0_1px_4px_rgba(0,0,0,0.18)]
                      transition-transform
                      duration-200
                      ${
                        notifications
                          ? "translate-x-[26px]"
                          : "translate-x-[4px]"
                      }
                    `}
                  />

                )}

              </button>

            </div>

          </section>


          {/* ==================================================
              DANGER ZONE
          ================================================== */}

          <section
            className="
              overflow-hidden
              rounded-[18px]
              border
              border-[#eee1e1]
              bg-white
              shadow-[0_4px_20px_rgba(20,50,35,0.035)]
            "
          >

            <div
              className="
                px-6
                py-5
              "
            >

              <div
                className="
                  flex
                  flex-col
                  gap-4
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >

                <div>

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <Trash2
                      size={17}
                      className="text-red-500"
                    />

                    <h2
                      className="
                        text-[16px]
                        font-bold
                        text-[#26342e]
                      "
                    >
                      {t(
                        "settings.dangerZone.title"
                      )}
                    </h2>

                  </div>


                  <p
                    className="
                      mt-1.5
                      text-[13px]
                      text-gray-500
                    "
                  >
                    {t(
                      "settings.dangerZone.subtitle"
                    )}
                  </p>

                </div>


                <button
                  type="button"
                  onClick={() =>
                    setShowDeleteModal(
                      true
                    )
                  }
                  className="
                    flex
                    h-[40px]
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-red-200
                    bg-red-50
                    px-4
                    text-[13px]
                    font-semibold
                    text-red-600
                    transition-all
                    duration-200
                    hover:border-red-300
                    hover:bg-red-100
                  "
                >

                  <Trash2
                    size={15}
                  />

                  {t(
                    "settings.dangerZone.deleteButton"
                  )}

                </button>

              </div>

            </div>

          </section>

        </div>

      </div>


      {/* ======================================================
          DELETE ACCOUNT MODAL
      ====================================================== */}

      {showDeleteModal && (

        <div
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            bg-black/40
            px-5
            backdrop-blur-[3px]
          "
          onClick={() =>
            !deleteLoading &&
            setShowDeleteModal(
              false
            )
          }
        >

          <div
            className="
              w-full
              max-w-[420px]
              rounded-[22px]
              bg-white
              p-7
              shadow-[0_20px_70px_rgba(0,0,0,0.18)]
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* ICON */}

            <div
              className="
                mx-auto
                flex
                h-[52px]
                w-[52px]
                items-center
                justify-center
                rounded-full
                bg-red-50
                text-red-600
              "
            >

              <Trash2
                size={23}
              />

            </div>


            {/* TITLE */}

            <h3
              className="
                mt-5
                text-center
                text-[20px]
                font-bold
                text-[#26342e]
              "
            >
              {t(
                "settings.deleteModal.title"
              )}
            </h3>


            {/* DESCRIPTION */}

            <p
              className="
                mt-2
                text-center
                text-[13px]
                leading-6
                text-gray-500
              "
            >
              {t(
                "settings.deleteModal.description"
              )}
            </p>


            {/* BUTTONS */}

            <div
              className="
                mt-6
                flex
                gap-3
              "
            >

              {/* CANCEL */}

              <button
                type="button"
                onClick={() =>
                  setShowDeleteModal(
                    false
                  )
                }
                disabled={
                  deleteLoading
                }
                className="
                  h-[43px]
                  flex-1
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  text-[13px]
                  font-semibold
                  text-gray-600
                  transition
                  hover:bg-gray-50
                  disabled:opacity-50
                "
              >
                {t(
                  "settings.deleteModal.cancel"
                )}
              </button>


              {/* DELETE */}

              <button
                type="button"
                onClick={
                  deleteAccount
                }
                disabled={
                  deleteLoading
                }
                className="
                  flex
                  h-[43px]
                  flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-red-600
                  text-[13px]
                  font-semibold
                  text-white
                  transition
                  hover:bg-red-700
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >

                {deleteLoading ? (

                  <>

                    <Loader2
                      size={16}
                      className="animate-spin"
                    />

                    {t(
                      "settings.deleteModal.deleting"
                    )}

                  </>

                ) : (

                  <>

                    <Trash2
                      size={16}
                    />

                    {t(
                      "settings.deleteModal.delete"
                    )}

                  </>

                )}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}