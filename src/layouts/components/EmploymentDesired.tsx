import { useState, useEffect } from "react";
import { Dict } from "styled-components/dist/types";

const EmploymentDesired = ({ formErrors }: Dict) => {
  const [selectedRadioBtn, setSelectedRadioBtn] = useState<Dict>({
    radioSet1: [false, false],
    radioSet2: [false, false],
    radioSet3: [false, false],
    radioSet4: [false, false],
  });
  const [selectedCheckBox, setSelectedCheckBox] = useState<boolean[]>(
    Array(7).fill(false),
  );
  const [isRequired, setIsRequired] = useState<boolean>(false);

  return (
    <>
      <h5 className="text-dark-grey pt-10 w-full">EMPLOYMENT DESIRED</h5>
      <hr className="w-full h-[1px] bg-dark-grey my-6" />

      <div className="w-full md:w-1/2 md:mb-6 mb-3">
        <label htmlFor="positions" className="form-label text-dark-grey">
          Position(s) Applying For <span className="text-red-500">*</span>
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
          Are you applying for? <span className="text-red-500">*</span>
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
        <label htmlFor="availability" className="form-label text-dark-grey">
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
          <label htmlFor="overtime" className="form-label text-dark-grey">
            Would you be available to work <br></br>overtime, if necessary?{" "}
            <span className="text-red-500">*</span>
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
        <label htmlFor="startDate" className="form-label text-dark-grey">
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
        <label htmlFor="accommodation" className="form-label text-dark-grey">
          Are you able to perform the essential job functions of the job for
          which you are applying with or without reasonable accommodation?{" "}
          <span className="text-red-500">*</span>
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
          <span className={`text-red-500 ${isRequired ? "inline" : "hidden"}`}>
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
    </>
  );
};

export default EmploymentDesired;
