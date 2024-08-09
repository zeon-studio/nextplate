"use client";

import { FormEvent, useState, useEffect } from "react";
import ErrorAlert from "@/partials/ErrorAlert";
import SuccessAlert from "@/partials/SuccessAlert";
import { Dict } from "styled-components/dist/types";
import EmploymentDesired from "./EmploymentDesired";

// Dynamic employment experience
type EmploymentExperience = {
  nameofEmployer: string;
  supervisor: string;
  address: string;
  phone: string;
  dateEmployedFrom: string;
  dateEmployedTo: string;
  employerContact: string;
};

const EmployeeApplicationForm = ({
  jobPositionID,
  jobPosition,
}: {
  jobPositionID: string;
  jobPosition: string;
}) => {
  const baseIndex = 6;
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSucess] = useState<string | null>(null);

  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<Dict>({});
  const [phone, setPhone] = useState<string>("");
  const [phone2, setPhone2] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [selectedRadioBtn, setSelectedRadioBtn] = useState<Dict>({
    radioSet1: [false, false],
    radioSet2: [false, false],
    radioSet3: [false, false],
    radioSet4: [false, false],
    radioSet5: [false, false],

    radioSet6: [false, false],
    radioSet7: [false, false],
    radioSet8: [false, false],
    radioSet9: [false, false],
    radioSet10: [false, false],
  });

  const [selectedCheckBox, setSelectedCheckBox] = useState<boolean[]>(
    Array(7).fill(false),
  );
  const [isRequired, setIsRequired] = useState<boolean>(false);

  useEffect(() => {
    validateForm();
  }, [phone, phone2, email, selectedRadioBtn, selectedCheckBox]);

  const validateCheckBoxes = (): boolean => {
    console.log("Selected check boxes: ", selectedCheckBox);
    if (!selectedCheckBox.includes(true)) {
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
    // console.log("Radio button set1: ", selectedRadioBtn["radioSet1"]);
    // console.log("Radio button set2: ", selectedRadioBtn["radioSet2"]);
    // console.log("Radio button set3: ", selectedRadioBtn["radioSet3"]);
    // console.log("Radio button set4: ", selectedRadioBtn["radioSet4"]);
    // console.log("Radio button set5: ", selectedRadioBtn["radioSet5"]);
    console.log("Radio button set6: ", selectedRadioBtn["radioSet6"]);
    console.log("Radio button set7: ", selectedRadioBtn["radioSet7"]);
    console.log("Radio button set8: ", selectedRadioBtn["radioSet8"]);
    console.log("Radio button set9: ", selectedRadioBtn["radioSet9"]);
    console.log("Radio button set10: ", selectedRadioBtn["radioSet10"]);

    const validateRadioBtnSet = (
      setName: string,
      errorKey: string,
    ): boolean => {
      if (!selectedRadioBtn[setName].includes(true)) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          // [errorKey]: `Pick one radio button for ${setName}`,
          [errorKey]: `Pick one radio button`,
        }));
        return false;
      } else {
        setFormErrors((prevErrors) => {
          const { [errorKey]: _, ...rest } = prevErrors;
          return rest;
        });
        return true;
      }
    };

    const isRadioSet1Valid = validateRadioBtnSet("radioSet1", "radio1");
    const isRadioSet2Valid = validateRadioBtnSet("radioSet2", "radio2");
    const isRadioSet3Valid = validateRadioBtnSet("radioSet3", "radio3");
    const isRadioSet4Valid = validateRadioBtnSet("radioSet4", "radio4");
    const isRadioSet5Valid = validateRadioBtnSet("radioSet5", "radio5");

    return (
      isRadioSet1Valid &&
      isRadioSet2Valid &&
      isRadioSet3Valid &&
      isRadioSet4Valid &&
      isRadioSet5Valid
    );
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
    if (phone2 && !phoneRegex.test(phone2)) {
      formErrors.phone2 = "Invalid phone number";
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
      const data = new FormData(event.currentTarget);
      data.append("jobPositionID", jobPositionID); //add this data to be connected content
      data.append("jobPosition", jobPosition);

      const response = await fetch("/api/submit", {
        method: "POST",
        body: data,
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

  const [employmentExperiences, setEmploymentExperiences] = useState([
    {
      nameofEmployer: "",
      supervisor: "",
      address: "",
      phone: "",
      dateEmployedFrom: "",
      dateEmployedTo: "",
      employerContact: "",
    },
  ]);

  // const handleAddExperience = () => {
  //   if (employmentExperiences.length < 5) {
  //     setEmploymentExperiences([
  //       ...employmentExperiences,
  //       {
  //         nameofEmployer: "",
  //         supervisor: "",
  //         address: "",
  //         phone: "",
  //         dateEmployedFrom: "",
  //         dateEmployedTo: "",
  //         employerContact: "",
  //       },
  //     ]);
  //   } else {
  //     alert("You can only add up to 5 employment experiences.");
  //   }
  // };

  const handleAddExperience = () => {
    if (employmentExperiences.length < 5) {
      const newIndex = employmentExperiences.length;

      // Add the new employment experience
      setEmploymentExperiences([
        ...employmentExperiences,
        {
          nameofEmployer: "",
          supervisor: "",
          address: "",
          phone: "",
          dateEmployedFrom: "",
          dateEmployedTo: "",
          employerContact: "",
        },
      ]);

      // Add a new radio button state for the new experience
      setSelectedRadioBtn((prevState) => ({
        ...prevState,
        [`radioSet${baseIndex + newIndex}`]: [false, false],
      }));
    } else {
      alert("You can only add up to 5 employment experiences.");
    }
  };

  function handleInputChange(
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const name = event.target.name as keyof EmploymentExperience;
    const value = event.target.value;
    const type = event.target.type;
    const id = event.target.id;

    console.log("TYPE: ", type);
    console.log("NAME:  ", name);
    console.log("VALUE: ", value);
    console.log("ID: ", id);
    console.log("INDEX: ", index);
    if (type == "radio") {
    }

    setEmploymentExperiences((prevState: EmploymentExperience[]) => {
      const updatedExperiences = [...prevState];
      updatedExperiences[index] = {
        ...updatedExperiences[index],
        [name]: value,
      };
      return updatedExperiences;
    });
  }

  // const handleDeleteExperience = (index: number) => {
  //   selectedRadioBtn[`radioSet${baseIndex + index}`] = [false, false];

  //   setEmploymentExperiences((prevState: EmploymentExperience[]) => {
  //     return prevState.filter((_, i) => i !== index);
  //   });
  // };
  const handleDeleteExperience = (index: number) => {
    const updatedSelectedRadioBtn = { ...selectedRadioBtn };
    const radioKey = `radioSet${baseIndex + index}`;

    // Reset the state of the radio buttons associated with the deleted card
    updatedSelectedRadioBtn[radioKey] = [false, false];

    // Adjust the keys for the remaining radio button sets
    for (let i = index + 1; i < employmentExperiences.length; i++) {
      const currentKey = `radioSet${baseIndex + i}`;
      const previousKey = `radioSet${baseIndex + i - 1}`;
      updatedSelectedRadioBtn[previousKey] =
        updatedSelectedRadioBtn[currentKey];
    }

    // Delete the last radio button set key since it's now redundant
    delete updatedSelectedRadioBtn[
      `radioSet${baseIndex + employmentExperiences.length - 1}`
    ];

    // Update the state with the modified radio button states
    setSelectedRadioBtn(updatedSelectedRadioBtn);

    // Update the employment experiences
    setEmploymentExperiences((prevState: EmploymentExperience[]) => {
      return prevState.filter((_, i) => i !== index);
    });
  };

  return (
    <>
      <section>
        <div className="container">
          <div className="animate-fade ease-in mx-auto">
            <form onSubmit={onSubmit} method="POST">
              <div className="flex flex-wrap">
                <div className="flex-col w-full">
                  <div className="w-full md:mb-6 mb-3">
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
                      className="form-input bg-light-grey shadow-sm placeholder-dark-grey md:w-1/3 xl:w-1/5 w-2/3 h-12 border-mischka"
                      placeholder="mm/dd/yyyy"
                      type="date"
                      required
                    />
                  </div>

                  <div className="flex md:flex-row flex-col">
                    <div className="w-full xl:w-1/4 lg:w-1/2 pr-3 md:mb-6 mb-3">
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

                    <div className="w-full xl:w-1/4 lg:w-1/2 pr-3 md:mb-6 mb-3">
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

                    <div className="w-full xl:w-1/4 lg:w-1/2 md:mb-6 mb-3">
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

                <div className="w-full md:mb-6 mb-3">
                  <label className="form-label text-dark-grey">Address</label>

                  <div className="flex flex-col">
                    <input
                      id="address1"
                      name="address1"
                      className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-full xl:w-1/3 md:w-3/5 h-12 border-mischka"
                      placeholder="Street Address"
                      type="text"
                    />
                    <input
                      id="address2"
                      name="address2"
                      className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-full xl:w-1/3 md:w-3/5 h-12 border-mischka mt-3"
                      placeholder="Street Address line 2 (optional)"
                      type="text"
                    />
                  </div>

                  <div>
                    <input
                      id="city"
                      name="city"
                      className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-3/5 xl:w-1/6 lg-w-1/5 md:w-1/4  h-12 border-mischka mt-3 mr-3"
                      placeholder="City"
                    />

                    <select
                      id="state"
                      name="state"
                      className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-3/5 xl:w-1/6 lg-w-1/5 md:w-1/4 border-mischka mt-3 mr-3"
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
                    className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-3/5 xl:w-1/6 lg-w-1/5 md:w-1/4 h-12 border-mischka mt-3"
                    placeholder="Zip Code"
                    type="text"
                    maxLength={5}
                    pattern="[0-9]{5}"
                  />
                </div>

                <div className="w-full lg:w-1/3 md:w-1/2 md:mb-6 mb-3 pr-3">
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

                <div className="w-full lg:w-1/3 md:w-1/2 md:mb-6 mb-3">
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

                {/* EMPLOYMENT DESIRED */}
                <h5 className="text-dark-grey pt-10 w-full">
                  EMPLOYMENT DESIRED
                </h5>
                <hr className="w-full h-[1px] bg-dark-grey my-6" />

                <div className="w-full md:w-1/2 md:mb-6 mb-3">
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

                <div className="w-full lg:w-2/5 lg:px-30 mb-3 lg:ml-10">
                  <label className="form-label text-dark-grey">
                    Are you applying for?{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  {/* Radio buttons */}
                  <div className="flex flex-row items-center md:space-x-10 space-x-3">
                    <div className="flex flex-row items-center">
                      <input
                        id="fullTime"
                        name="employeeType"
                        value="Regular Full Time Work"
                        type="radio"
                        className="mr-1"
                        checked={selectedRadioBtn["radioSet1"][0]}
                        onChange={() =>
                          setSelectedRadioBtn({
                            ...selectedRadioBtn,
                            radioSet1: [true, false],
                          })
                        }
                      />
                      <label htmlFor="fullTime"> Regular Full Time Work</label>
                    </div>

                    <div className="flex flex-row items-center">
                      <input
                        id="partTime"
                        name="employeeType"
                        value="Regular Part Time Work"
                        type="radio"
                        className="md:ml-4 mr-1"
                        checked={selectedRadioBtn["radioSet1"][1]}
                        onChange={() =>
                          setSelectedRadioBtn({
                            ...selectedRadioBtn,
                            radioSet1: [false, true],
                          })
                        }
                      />
                      <label htmlFor="partTime"> Regular Part Time Work</label>
                    </div>
                  </div>
                  {formErrors.radio1 && (
                    <p className="text-red-500">{formErrors.radio1}</p>
                  )}
                </div>

                <div className="w-full md:mb-6 mb-3">
                  <label
                    htmlFor="availability"
                    className="form-label text-dark-grey"
                  >
                    What days and hours are you available for work?{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  {/* Check box buttons */}
                  <div className="flex flex-row items-center pt-2">
                    <div className="flex flex-col space-y-3">
                      <div className="flex flex-wrap">
                        {[
                          "Monday",
                          "Tuesday",
                          "Wednesday",
                          "Thursday",
                          "Friday",
                          "Saturday",
                          "Sunday",
                        ].map((day, i) => (
                          <div key={i} className="w-1/2 md:w-1/4 py-1">
                            <input
                              type="checkbox"
                              className="mr-1 rounded-sm"
                              value={day}
                              id={`checkbox${i + 1}`}
                              name="availability"
                              checked={selectedCheckBox[i]}
                              onChange={() => {
                                setSelectedCheckBox((prevState) =>
                                  prevState.map((val, index) =>
                                    index === i ? !val : val,
                                  ),
                                );
                              }}
                            />
                            <label htmlFor={`checkbox${i + 1}`}>{day}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {formErrors.checkbox && (
                    <p className="text-red-500">{formErrors.checkbox}</p>
                  )}
                </div>

                <div className="flex flex-row w-full gap-14">
                  <div className="lg:w-1/4 w-full md:mb-6 mb-3">
                    <label className="form-label text-dark-grey">
                      Are you available to work <br></br>on weekends?{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    {/* Radio buttons */}
                    <div className="flex flex-row items-center pt-2 space-x-10">
                      <div className="flex flex-row items-center">
                        <input
                          id="available"
                          name="weekendAvailability"
                          value="Yes"
                          type="radio"
                          className="mr-2"
                          checked={selectedRadioBtn["radioSet2"][0]}
                          onChange={() =>
                            setSelectedRadioBtn({
                              ...selectedRadioBtn,
                              radioSet2: [true, false],
                            })
                          }
                        />
                        <label htmlFor="available"> Yes</label>
                      </div>

                      <div className="flex flex-row items-center">
                        <input
                          id="notAvailable"
                          name="weekendAvailability"
                          value="No"
                          type="radio"
                          className="mr-2"
                          checked={selectedRadioBtn["radioSet2"][1]}
                          onChange={() =>
                            setSelectedRadioBtn({
                              ...selectedRadioBtn,
                              radioSet2: [false, true],
                            })
                          }
                        />
                        <label htmlFor="notAvailable"> No</label>
                      </div>
                    </div>
                    {formErrors.radio2 && (
                      <p className="text-red-500">{formErrors.radio2}</p>
                    )}
                  </div>

                  <div className="lg:w-1/3 w-full md:mb-6 mb-3">
                    <label
                      htmlFor="overtime"
                      className="form-label text-dark-grey"
                    >
                      Would you be available to work <br></br>overtime, if
                      necessary? <span className="text-red-500">*</span>
                    </label>

                    {/* Radio buttons */}
                    <div className="flex flex-row items-center pt-2 space-x-10">
                      <div className="flex flex-row items-center">
                        <input
                          id="yesOvertime"
                          name="overtime"
                          value="Yes"
                          type="radio"
                          className="mr-2"
                          checked={selectedRadioBtn["radioSet3"][0]}
                          onChange={() =>
                            setSelectedRadioBtn({
                              ...selectedRadioBtn,
                              radioSet3: [true, false],
                            })
                          }
                        />
                        <label htmlFor="overtime"> Yes</label>
                      </div>

                      <div className="flex flex-row items-center">
                        <input
                          id="noOvertime"
                          name="overtime"
                          value="No"
                          type="radio"
                          className="mr-2"
                          checked={selectedRadioBtn["radioSet3"][1]}
                          onChange={() =>
                            setSelectedRadioBtn({
                              ...selectedRadioBtn,
                              radioSet3: [false, true],
                            })
                          }
                        />
                        <label htmlFor="overtime"> No</label>
                      </div>
                    </div>
                    {formErrors.radio3 && (
                      <p className="text-red-500">{formErrors.radio3}</p>
                    )}
                  </div>
                </div>

                <div className="w-full md:mb-6 mb-3">
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
                    className="form-input bg-light-grey shadow-sm placeholder-dark-grey md:w-1/3 lg:w-1/5 w-2/3 h-12 border-mischka"
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
                        value="Yes"
                        type="radio"
                        className="mr-2"
                        checked={selectedRadioBtn["radioSet4"][0]}
                        onChange={() => {
                          setSelectedRadioBtn({
                            ...selectedRadioBtn,
                            radioSet4: [true, false],
                          });
                          setIsRequired(false);
                        }}
                      />
                      <label htmlFor="accommodation"> Yes</label>
                    </div>

                    <div className="flex flex-row items-center">
                      <input
                        id="noAccommodation"
                        name="accommodation"
                        value="No"
                        type="radio"
                        className="mr-2"
                        checked={selectedRadioBtn["radioSet4"][1]}
                        onChange={() => {
                          setSelectedRadioBtn({
                            ...selectedRadioBtn,
                            radioSet4: [false, true],
                          });
                          setIsRequired(true);
                        }}
                      />
                      <label htmlFor="accommodation"> No</label>
                    </div>
                  </div>
                  {formErrors.radio4 && (
                    <p className="text-red-500">{formErrors.radio4}</p>
                  )}
                </div>

                <div className="w-full px-1 md:mb-6 mb-3">
                  <label
                    htmlFor="accommodationMessage"
                    className="form-label text-dark-grey"
                  >
                    If no, describe the functions that cannot be performed.
                    <span
                      className={`text-red-500 ${isRequired ? "inline" : "hidden"}`}
                    >
                      *
                    </span>
                  </label>

                  <textarea
                    id="accommodationMessage"
                    name="accommodationMessage"
                    className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-full border-mischka"
                    placeholder="Note: We comply with the ADA and consider reasonable accommodation measures that may be necessary for qualified applicants/employees to perform essential job functions."
                    rows={7}
                    required={isRequired}
                  ></textarea>
                </div>

                {/* EMPLOYMENT EXPERIENCE */}
                <h5 className="text-dark-grey pt-10 w-full">
                  EMPLOYMENT EXPERIENCE
                </h5>
                <p>
                  List the names of your present or previous employers in
                  chronological order with present or most recent employer
                  listed first. Be sure to account for all periods of time. If
                  self-employed, give firm name and supply business references.
                  Add additional page if necessary.
                </p>
                <hr className="w-full h-[1px] bg-dark-grey my-6" />
                <div>
                  <div>
                    {employmentExperiences.map((experience, index) => (
                      <div key={index} className="flex flex-col mb-6">
                        <div className="flex md:flex-row flex-col">
                          <div className="w-full md:mb-6 mb-3 pr-3">
                            <label
                              htmlFor={`nameofEmployer${index}`}
                              className="form-label text-dark-grey"
                            >
                              Name of Employer{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              id={`nameofEmployer${index}`}
                              name="nameofEmployer"
                              className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-full h-12 border-mischka"
                              type="text"
                              value={experience.nameofEmployer}
                              onChange={(event) =>
                                handleInputChange(index, event)
                              }
                              required
                            />
                          </div>

                          <div className="w-full md:mb-6 mb-3 pr-14">
                            <label
                              htmlFor={`supervisor${index}`}
                              className="form-label text-dark-grey"
                            >
                              Supervisor <span className="text-red-500">*</span>
                            </label>
                            <input
                              id={`supervisor${index}`}
                              name="supervisor"
                              className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-full h-12 border-mischka"
                              type="text"
                              value={experience.supervisor}
                              onChange={(event) =>
                                handleInputChange(index, event)
                              }
                              required
                            />
                          </div>

                          <div className="flex flex-col w-full md:mb-6 mb-3">
                            <label className="form-label text-dark-grey">
                              May we contact?{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <div className="flex flex-row items-center md:space-x-10 space-x-3">
                              <div className="flex flex-row items-center">
                                <input
                                  id={`yesContact${index}`}
                                  name={`employerContact${index}`}
                                  value="Yes"
                                  type="radio"
                                  className="mr-1"
                                  checked={
                                    selectedRadioBtn[
                                      `radioSet${baseIndex + index}`
                                    ][0]
                                  }
                                  onChange={(event) => {
                                    setSelectedRadioBtn({
                                      ...selectedRadioBtn,
                                      [`radioSet${baseIndex + index}`]: [
                                        true,
                                        false,
                                      ],
                                    });
                                  }}
                                />
                                <label htmlFor={`yesContact${index}`}>
                                  Yes
                                </label>
                              </div>

                              <div className="flex flex-row items-center">
                                <input
                                  id={`noContact${index}`}
                                  name={`employerContact${index}`}
                                  value="No"
                                  type="radio"
                                  className="md:ml-4 mr-1"
                                  checked={
                                    selectedRadioBtn[
                                      `radioSet${baseIndex + index}`
                                    ][1]
                                  }
                                  onChange={(event) => {
                                    setSelectedRadioBtn({
                                      ...selectedRadioBtn,
                                      [`radioSet${baseIndex + index}`]: [
                                        false,
                                        true,
                                      ],
                                    });
                                  }}
                                />
                                <label htmlFor={`noContact${index}`}>No</label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col w-full md:mb-6 mb-3 pr-3">
                          <label
                            htmlFor={`address${index}`}
                            className="form-label text-dark-grey"
                          >
                            Street Address{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            id={`address${index}`}
                            name="address"
                            className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-full xl:w-1/3 md:w-3/5 h-12 border-mischka"
                            type="text"
                            value={experience.address}
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
                            required
                          />
                        </div>

                        <div className="flex md:flex-row flex-col w-full">
                          <div className="w-full xl:w-1/3 lg:w-1/2 pr-3 md:mb-6 mb-3">
                            <label
                              htmlFor={`phone${index}`}
                              className="form-label text-dark-grey"
                            >
                              Phone number{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              id={`phone${index}`}
                              name="phone"
                              className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-full h-12 border-mischka"
                              type="tel"
                              value={experience.phone}
                              onChange={(event) =>
                                handleInputChange(index, event)
                              }
                              required
                            />
                          </div>

                          <div className="w-full xl:w-2/5 lg:w-1/2 pr-3 md:mb-6 mb-3">
                            <label
                              htmlFor={`dateEmployedFrom${index}`}
                              className="form-label text-dark-grey"
                            >
                              Date Employed - From{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              id={`dateEmployedFrom${index}`}
                              name="dateEmployedFrom"
                              className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-full h-12 border-mischka"
                              type="date"
                              value={experience.dateEmployedFrom}
                              onChange={(event) =>
                                handleInputChange(index, event)
                              }
                              required
                            />
                          </div>

                          <div className="w-full xl:w-2/5 lg:w-1/2 pr-3 md:mb-6 mb-3">
                            <label
                              htmlFor={`dateEmployedTo${index}`}
                              className="form-label text-dark-grey"
                            >
                              Date Employed - To{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              id={`dateEmployedTo${index}`}
                              name="dateEmployedTo"
                              className="form-input bg-light-grey shadow-sm placeholder-dark-grey w-full h-12 border-mischka"
                              type="date"
                              value={experience.dateEmployedTo}
                              onChange={(event) =>
                                handleInputChange(index, event)
                              }
                              required
                            />
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeleteExperience(index)}
                          className="bg-red-500 rounded-md text-white text-md px-4 py-2 mt-4 w-1/2"
                        >
                          Delete Experience
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      className="bg-blue-500 rounded-md text-md text-white px-4 py-2 mt-4"
                      onClick={handleAddExperience}
                    >
                      Add new employment experience
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit form button */}
              <div className="pt-10">
                <button
                  type="submit"
                  className="bg-primary hover:bg-dark-grey text-white font-semibold py-2 px-6 border border-primary hover:border-transparent rounded"
                  disabled={isLoading}
                >
                  <svg
                    aria-hidden="true"
                    className={`${isLoading ? "inline w-6 h-6 text-gray-200 animate-spin fill-blue-600 mr-2" : "hidden"}`}
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  {isLoading ? "Loading..." : "Submit"}
                </button>
              </div>
            </form>
          </div>

          <div className="md:col-5 pt-10">
            {error && <ErrorAlert error_message={error}></ErrorAlert>}
            {success && <SuccessAlert success_message={success}></SuccessAlert>}
          </div>
        </div>
      </section>
    </>
  );
};

export default EmployeeApplicationForm;
