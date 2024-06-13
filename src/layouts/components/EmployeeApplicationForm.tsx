"use client";

import { FormEvent, useState, useEffect } from "react";
import ErrorAlert from "@/partials/ErrorAlert";
import SuccessAlert from "@/partials/SuccessAlert";
import { Dict } from "styled-components/dist/types";

const EmployeeApplicationForm = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSucess] = useState<string | null>(null);

  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<Dict>({});
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [selectedRadioBtn, setSelectedRadioBtn] = useState<boolean>(false);
  const [selectedCheckBox, setSelectedCheckBox] = useState<boolean[]>([]);

  useEffect(() => {
    validateForm();
  }, [phone, email, selectedRadioBtn, selectedCheckBox]);

  const validateCheckBoxes = (): boolean => {
    if (selectedCheckBox.length === 0) {
      // Add previous list of errors along with checkbox error
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        checkbox: "Pick at least one checkbox",
      }));
      return false;
    }
    setFormErrors((prevErrors) => {
      const { radio, ...rest } = prevErrors;
      return rest;
    });
    return true;
  };

  const validateRadioBtns = (): boolean => {
    if (!selectedRadioBtn) {
      // Add previous list of errors along with radio error
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        radio: "Pick one radio button",
      }));
      return false;
    }
    setFormErrors((prevErrors) => {
      const { radio, ...rest } = prevErrors;
      return rest;
    });
    return true;
  };

  const validateForm = (): void => {
    let formErrors: { [key: string]: string } = {};

    let phoneRegex = new RegExp(
      /^\+?\d{1,2}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
    );
    let emailRegex = new RegExp(/^[^@]*@[^@]*$/);

    if (phone && !phoneRegex.test(phone)) {
      formErrors.phone = "Invalid phone number";
    }
    if (email && !emailRegex.test(email)) {
      formErrors.email = "Invalid email address";
    }

    setFormErrors(formErrors);
    setIsFormValid(Object.keys(formErrors).length === 0);
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null); // Clear previous errors when a new request starts

    validateForm();
    if (!validateRadioBtns() || !validateCheckBoxes() || !isFormValid) {
      setError("Fix form errors before submitting!");
      setLoading(false);
      return false;
    }

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/submit", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit the data. Please try again.");
      } else {
        setSucess("Form submitted sucessfully!");
      }

      // // Handle response if necessary
      // const data = await response.json();
    } catch (err) {
      const error = err as Error;
      // Capture the error message to display to the user
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section>
        <div className="container">
          <div className="animate-fade ease-in mx-auto">
            <form onSubmit={onSubmit} method="POST">
              <div className="flex flex-wrap">
                <div className="flex-col">
                  <div className="w-full md:w-1/3 px-1 md:mb-6 mb-3">
                    <label
                      htmlFor="dateOfApplication"
                      className="form-label text-dark-grey"
                    >
                      Date of Application{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="dateOfApplication"
                      name="dateOfApplication"
                      className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-full h-12 border-mischka"
                      placeholder="mm/dd/yyyy"
                      type="date"
                      required
                    />
                  </div>

                  <div className="flex flex-row">
                    <div className="w-full md:w-1/2 px-1 md:mb-6 mb-3">
                      <label
                        htmlFor="fname"
                        className="form-label text-dark-grey"
                      >
                        First name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="fname"
                        name="fname"
                        className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-full h-12 border-mischka"
                        placeholder="First name"
                        type="text"
                        required
                      />
                    </div>

                    <div className="w-full md:w-1/2 px-1 md:mb-6 mb-3">
                      <label
                        htmlFor="mname"
                        className="form-label text-dark-grey"
                      >
                        Middle name
                      </label>
                      <input
                        id="mname"
                        name="mname"
                        className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-full h-12 border-mischka"
                        placeholder="Middle name"
                        type="text"
                      />
                    </div>

                    <div className="w-full md:w-1/2 px-1 md:mb-6 mb-3">
                      <label
                        htmlFor="lname"
                        className="form-label text-dark-grey"
                      >
                        Last name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="lname"
                        name="lname"
                        className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-full h-12 border-mischka"
                        placeholder="Last name"
                        type="text"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full px-1 md:mb-6 mb-3">
                  <label
                    htmlFor="address1"
                    className="form-label text-dark-grey"
                  >
                    Address
                  </label>

                  <div className="flex flex-col">
                    <input
                      id="address1"
                      name="address1"
                      className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-3/5 h-12 border-mischka"
                      placeholder="Street Address"
                      type="text"
                    />
                    <input
                      id="address2"
                      name="address2"
                      className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-3/5 h-12 border-mischka mt-3"
                      placeholder="Street Address line 2 (optional)"
                      type="text"
                    />
                  </div>

                  <div>
                    <input
                      id="city"
                      name="city"
                      className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-1/6 h-12 border-mischka mt-3 mr-3"
                      placeholder="City"
                    />

                    <select
                      id="state"
                      name="state"
                      className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-1/6  border-mischka mt-3 mr-3"
                      defaultValue="State"
                    >
                      <option value="State" disabled hidden>
                        State
                      </option>
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="HI">Hawaii</option>
                      <option value="ID">Idaho</option>
                      <option value="IL">Illinois</option>
                      <option value="IN">Indiana</option>
                      <option value="IA">Iowa</option>
                      <option value="KS">Kansas</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="ME">Maine</option>
                      <option value="MD">Maryland</option>
                      <option value="MA">Massachusetts</option>
                      <option value="MI">Michigan</option>
                      <option value="MN">Minnesota</option>
                      <option value="MS">Mississippi</option>
                      <option value="MO">Missouri</option>
                      <option value="MT">Montana</option>
                      <option value="NE">Nebraska</option>
                      <option value="NV">Nevada</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NM">New Mexico</option>
                      <option value="NY">New York</option>
                      <option value="NC">North Carolina</option>
                      <option value="ND">North Dakota</option>
                      <option value="OH">Ohio</option>
                      <option value="OK">Oklahoma</option>
                      <option value="OR">Oregon</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="RI">Rhode Island</option>
                      <option value="SC">South Carolina</option>
                      <option value="SD">South Dakota</option>
                      <option value="TN">Tennessee</option>
                      <option value="TX">Texas</option>
                      <option value="UT">Utah</option>
                      <option value="VT">Vermont</option>
                      <option value="VA">Virginia</option>
                      <option value="WA">Washington</option>
                      <option value="WV">West Virginia</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WY">Wyoming</option>
                    </select>
                  </div>

                  <input
                    id="zipcode"
                    name="zipcode"
                    className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-1/6 h-12 border-mischka mt-3"
                    placeholder="Zip Code"
                    type="text"
                    maxLength={5}
                    pattern="[0-9]{5}"
                  />
                </div>

                <div className="w-1/2 px-1">
                  <label htmlFor="phone" className="form-label text-dark-grey">
                    Phone number <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-full h-12 border-mischka"
                    placeholder="+ 1 (123) 456-7891"
                    type="tel"
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  {formErrors.phone && (
                    <p className="text-red-500">{formErrors.phone}</p>
                  )}
                </div>

                <div className="w-1/2 px-1 md:mb-6 mb-3">
                  <label htmlFor="email" className="form-label text-dark-grey">
                    Email address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-full h-12 border-mischka"
                    placeholder="john.doe@email.com"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {formErrors.email && (
                    <p className="text-red-500">{formErrors.email}</p>
                  )}
                </div>

                <h5 className="text-dark-grey pt-10">EMPLOYMENT DESIRED</h5>
                <hr className="w-full h-[1px] bg-dark-grey my-6" />

                {/* EMPLOYMENT DESIRED */}
                <div className="w-full md:w-1/2 px-1 md:mb-6 mb-3">
                  <label
                    htmlFor="positions"
                    className="form-label text-dark-grey"
                  >
                    Position(s) Applying For{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="positions"
                    name="positions"
                    className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-full h-12 border-mischka"
                    placeholder=""
                    type="text"
                    required
                  />
                </div>

                <div className="w-full md:w-1/2 px-10 md:mb-6 mb-3">
                  <label
                    htmlFor="employeeType"
                    className="form-label text-dark-grey"
                  >
                    Are you applying for?{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  {/* Radio buttons */}
                  <div className="flex flex-row items-center space-x-10">
                    <div className="flex flex-row items-center">
                      <input
                        id="fullTime"
                        name="employeeType"
                        value="fullTime"
                        type="radio"
                        className="mr-1"
                        onChange={(e) => setSelectedRadioBtn(e.target.checked)}
                      />
                      <label htmlFor="fullTime"> Regular Full Time Work</label>
                    </div>

                    <div className="flex flex-row items-center">
                      <input
                        id="partTime"
                        name="employeeType"
                        value="partTime"
                        type="radio"
                        className="ml-4 mr-1"
                        onChange={(e) => setSelectedRadioBtn(e.target.checked)}
                      />
                      <label htmlFor="partTime"> Regular Part Time Work</label>
                    </div>
                  </div>
                  {formErrors.radio && (
                    <p className="text-red-500">{formErrors.radio}</p>
                  )}
                </div>

                <div className="w-full md:mb-6 mb-3">
                  <label
                    htmlFor="employeeType"
                    className="form-label text-dark-grey"
                  >
                    What days and hours are you available for work?{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  {/* Check box buttons */}
                  <div className="flex flex-row items-center pt-2">
                    <div className="flex flex-col space-y-3">
                      <div className="flex flex-row items-center ml-2 space-x-[125px]">
                        <div className="flex flex-row items-center">
                          <input
                            id="monday"
                            name="monday"
                            value="monday"
                            type="checkbox"
                            className="mr-1 rounded-sm"
                            onChange={(e) =>
                              selectedCheckBox.push(e.target.checked)
                            }
                          />
                          <label htmlFor="monday">Monday</label>
                        </div>

                        <div className="flex flex-row items-center">
                          <input
                            id="tuesday"
                            name="tuesday"
                            value="tuesday"
                            type="checkbox"
                            className="mr-1 rounded-sm"
                            onChange={(e) =>
                              selectedCheckBox.push(e.target.checked)
                            }
                          />
                          <label htmlFor="tuesday">Tuesday</label>
                        </div>
                      </div>

                      <div className="flex flex-row items-center ml-2 space-x-[100px]">
                        <div className="flex flex-row items-center">
                          <input
                            id="wednesday"
                            name="wednesday"
                            value="wednesday"
                            type="checkbox"
                            className="mr-1 rounded-sm"
                            onChange={(e) =>
                              selectedCheckBox.push(e.target.checked)
                            }
                          />
                          <label htmlFor="wednesday"> Wednesday</label>
                        </div>

                        <div className="flex flex-row items-center">
                          <input
                            id="thursday"
                            name="thursday"
                            value="thursday"
                            type="checkbox"
                            className="mr-1 rounded-sm"
                            onChange={(e) =>
                              selectedCheckBox.push(e.target.checked)
                            }
                          />
                          <label htmlFor="thursday">Thursday</label>
                        </div>
                      </div>
                      <div className="flex flex-row items-center ml-2 space-x-[138px]">
                        <div className="flex flex-row items-center">
                          <input
                            id="friday"
                            name="friday"
                            value="friday"
                            type="checkbox"
                            className="mr-1 rounded-sm"
                            onChange={(e) =>
                              selectedCheckBox.push(e.target.checked)
                            }
                          />
                          <label htmlFor="friday"> Friday</label>
                        </div>

                        <div className="flex flex-row items-center mr-2">
                          <input
                            id="saturday"
                            name="saturday"
                            value="saturday"
                            type="checkbox"
                            className="mr-1 rounded-sm"
                            onChange={(e) =>
                              selectedCheckBox.push(e.target.checked)
                            }
                          />
                          <label htmlFor="saturday"> Saturday</label>
                        </div>
                      </div>

                      <div className="flex flex-row items-center ml-2">
                        <input
                          id="sunday"
                          name="sunday"
                          value="sunday"
                          type="checkbox"
                          className="mr-1 rounded-sm"
                          onChange={(e) =>
                            selectedCheckBox.push(e.target.checked)
                          }
                        />
                        <label htmlFor="sunday"> Sunday</label>
                      </div>
                    </div>
                  </div>
                  {formErrors.checkbox && (
                    <p className="text-red-500">{formErrors.checkbox}</p>
                  )}
                </div>

                <div className="flex flex-row w-full">
                  <div className="w-1/4 md:mb-6 mb-3">
                    <label
                      htmlFor="availability"
                      className="form-label text-dark-grey"
                    >
                      Are you available to work <br></br>on weekends?{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    {/* Radio buttons */}
                    <div className="flex flex-row items-center pt-2 space-x-10">
                      <div className="flex flex-row items-center">
                        <input
                          id="available"
                          name="availability"
                          value="available"
                          type="radio"
                          className="mr-2"
                        />
                        <label htmlFor="available"> Yes</label>
                      </div>

                      <div className="flex flex-row items-center">
                        <input
                          id="notAvailable"
                          name="availability"
                          value="notAvailable"
                          type="radio"
                          className="mr-2"
                        />
                        <label htmlFor="availability"> No</label>
                      </div>
                    </div>
                  </div>

                  <div className="w-1/4 md:mb-6 mb-3">
                    <label
                      htmlFor="overtime"
                      className="form-label text-dark-grey"
                    >
                      Would you be available to work<br></br>overtime, if
                      necessary? <span className="text-red-500">*</span>
                    </label>

                    {/* Radio buttons */}
                    <div className="flex flex-row items-center pt-2 space-x-10">
                      <div className="flex flex-row items-center">
                        <input
                          id="yesOvertime"
                          name="overtime"
                          value="yesOvertime"
                          type="radio"
                          className="mr-2"
                        />
                        <label htmlFor="overtime"> Yes</label>
                      </div>

                      <div className="flex flex-row items-center">
                        <input
                          id="noOvertime"
                          name="overtime"
                          value="noOvertime"
                          type="radio"
                          className="mr-2"
                        />
                        <label htmlFor="overtime"> No</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full px-1 md:mb-6 mb-3">
                  <label
                    htmlFor="startDate"
                    className="form-label text-dark-grey"
                  >
                    If hired, what date can you start work?{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="startDate"
                    name="startDate"
                    className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-1/5 h-12 border-mischka"
                    placeholder="mm/dd/yyyy"
                    type="date"
                    required
                  />
                </div>

                <div className="w-full md:mb-6 mb-3">
                  <label
                    htmlFor="accommodation"
                    className="form-label text-dark-grey"
                  >
                    Are you able to perform the essential job functions of the
                    job for which you are applying with or without reasonable
                    accommodation? <span className="text-red-500">*</span>
                  </label>

                  {/* Radio buttons */}
                  <div className="flex flex-row items-center pt-2 space-x-10">
                    <div className="flex flex-row items-center">
                      <input
                        id="yesAccommodation"
                        name="accommodation"
                        value="yesAccommodation"
                        type="radio"
                        className="mr-2"
                      />
                      <label htmlFor="accommodation"> Yes</label>
                    </div>

                    <div className="flex flex-row items-center">
                      <input
                        id="noAccommodation"
                        name="accommodation"
                        value="noAccommodation"
                        type="radio"
                        className="mr-2"
                      />
                      <label htmlFor="accommodation"> No</label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <div className="px-1 w-[140px]">
                <button
                  type="submit"
                  className="btn btn-primary hover:bg-dark-grey hover:border-dark-grey shadow-sm w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Submit"}
                </button>
              </div>
            </form>
          </div>

          <div className="col-5 pt-10">
            {error && <ErrorAlert error_message={error}></ErrorAlert>}
            {success && <SuccessAlert success_message={success}></SuccessAlert>}
          </div>
        </div>
      </section>
    </>
  );
};

export default EmployeeApplicationForm;
