
import { useState } from "react";

type DriverRegistrationProps = {
  onSuccess: (message: string) => void;
};

type DriverForm = {
  fullName: string;
  email: string;
  phone: string;
  area: string;
  licenceNumber: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleColour: string;
  numberPlate: string;
  passengerSeats: string;
  ownership: "own" | "authorised";
  ownerName: string;
  ownerPhone: string;
  permissionConfirmed: boolean;
  hasDriversLicence: boolean;
  hasVehicleDocuments: boolean;
  hasPermissionProof: boolean;
  hasOtherRequiredDocuments: boolean;
};

const initialForm: DriverForm = {
  fullName: "",
  email: "",
  phone: "",
  area: "",
  licenceNumber: "",
  vehicleMake: "",
  vehicleModel: "",
  vehicleYear: "",
  vehicleColour: "",
  numberPlate: "",
  passengerSeats: "4",
  ownership: "own",
  ownerName: "",
  ownerPhone: "",
  permissionConfirmed: false,
  hasDriversLicence: false,
  hasVehicleDocuments: false,
  hasPermissionProof: false,
  hasOtherRequiredDocuments: false,
};

const steps = [
  "Personal details",
  "Vehicle details",
  "Ownership",
  "Documents",
  "Review",
];

function DriverRegistration({ onSuccess }: DriverRegistrationProps) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<DriverForm>(initialForm);
  const [error, setError] = useState("");

  function updateField<K extends keyof DriverForm>(
    field: K,
    value: DriverForm[K]
  ) {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  }

  function validateStep(): boolean {
    if (step === 0) {
      if (
        !form.fullName.trim() ||
        !form.email.trim() ||
        !form.phone.trim() ||
        !form.area.trim()
      ) {
        setError("Please complete all personal details.");
        return false;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        setError("Please enter a valid email address.");
        return false;
      }
    }

    if (step === 1) {
      if (
        !form.vehicleMake.trim() ||
        !form.vehicleModel.trim() ||
        !form.vehicleYear.trim() ||
        !form.vehicleColour.trim() ||
        !form.numberPlate.trim() ||
        !form.passengerSeats
      ) {
        setError("Please complete all vehicle details.");
        return false;
      }

      const year = Number(form.vehicleYear);
      const currentYear = new Date().getFullYear();

      if (!Number.isInteger(year) || year < 1980 || year > currentYear + 1) {
        setError("Please enter a valid vehicle year.");
        return false;
      }
    }

    if (step === 2 && form.ownership === "authorised") {
      if (
        !form.ownerName.trim() ||
        !form.ownerPhone.trim() ||
        !form.permissionConfirmed
      ) {
        setError(
          "Enter the owner's details and confirm that you have permission."
        );
        return false;
      }
    }

    if (step === 3) {
      if (
        !form.licenceNumber.trim() ||
        !form.hasDriversLicence ||
        !form.hasVehicleDocuments
      ) {
        setError(
          "Enter your licence details and confirm the licence and vehicle document checklist."
        );
        return false;
      }

      if (
        form.ownership === "authorised" &&
        !form.hasPermissionProof
      ) {
        setError("Please confirm that you can provide proof of permission.");
        return false;
      }

      if (!form.hasOtherRequiredDocuments) {
        setError(
          "Please confirm that you can provide any other documents required for verification."
        );
        return false;
      }
    }

    setError("");
    return true;
  }

  function handleNext() {
    if (!validateStep()) return;
    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  function handleBack() {
    setError("");
    setStep((current) => Math.max(current - 1, 0));
  }

  function handleSubmit() {
    onSuccess(
      `Driver application demo completed for ${form.fullName}. No application has been saved or submitted for verification yet.`
    );
  }

  return (
    <div className="driver-wizard">
      <p className="wizard-eyebrow">SAFERIDE DRIVER APPLICATION</p>

      <h2>Become a SafeRide driver</h2>

      <p className="wizard-description">
        Complete each step to prepare your driver application.
      </p>

      <div
        className="wizard-progress"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={steps.length}
        aria-valuenow={step + 1}
        aria-label="Driver registration progress"
      >
        <div
          className="wizard-progress-fill"
          style={{ width: `${((step + 1) / steps.length) * 100}%` }}
        />
      </div>

      <p className="wizard-step-label">
        Step {step + 1} of {steps.length}: {steps[step]}
      </p>

      {step === 0 && (
        <section className="wizard-section">
          <h3>Personal details</h3>
          <p>Tell us how to contact you.</p>

          <label htmlFor="driver-name">Full legal name</label>
          <input
            id="driver-name"
            autoComplete="name"
            value={form.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            placeholder="Enter your full name"
            required
          />

          <label htmlFor="driver-email">Email address</label>
          <input
            id="driver-email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="you@example.com"
            required
          />

          <label htmlFor="driver-phone">Phone number</label>
          <input
            id="driver-phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            placeholder="e.g. 071 234 5678"
            required
          />

          <label htmlFor="driver-area">Residential area or town</label>
          <input
            id="driver-area"
            autoComplete="address-level2"
            value={form.area}
            onChange={(e) => updateField("area", e.target.value)}
            placeholder="e.g. Rustenburg"
            required
          />
        </section>
      )}

      {step === 1 && (
        <section className="wizard-section">
          <h3>Vehicle details</h3>
          <p>Enter the details of the vehicle you want to use.</p>

          <label htmlFor="vehicle-make">Vehicle make</label>
          <input
            id="vehicle-make"
            value={form.vehicleMake}
            onChange={(e) => updateField("vehicleMake", e.target.value)}
            placeholder="e.g. Toyota"
            required
          />

          <label htmlFor="vehicle-model">Model</label>
          <input
            id="vehicle-model"
            value={form.vehicleModel}
            onChange={(e) => updateField("vehicleModel", e.target.value)}
            placeholder="e.g. Corolla"
            required
          />

          <label htmlFor="vehicle-year">Year</label>
          <input
            id="vehicle-year"
            type="number"
            min="1980"
            max={new Date().getFullYear() + 1}
            value={form.vehicleYear}
            onChange={(e) => updateField("vehicleYear", e.target.value)}
            placeholder="e.g. 2022"
            required
          />

          <label htmlFor="vehicle-colour">Colour</label>
          <input
            id="vehicle-colour"
            value={form.vehicleColour}
            onChange={(e) => updateField("vehicleColour", e.target.value)}
            placeholder="e.g. White"
            required
          />

          <label htmlFor="vehicle-plate">Registration number plate</label>
          <input
            id="vehicle-plate"
            value={form.numberPlate}
            onChange={(e) => updateField("numberPlate", e.target.value)}
            placeholder="Enter the number plate"
            required
          />

          <label htmlFor="vehicle-seats">Passenger seats available</label>
          <select
            id="vehicle-seats"
            value={form.passengerSeats}
            onChange={(e) => updateField("passengerSeats", e.target.value)}
          >
            <option value="1">1 passenger</option>
            <option value="2">2 passengers</option>
            <option value="3">3 passengers</option>
            <option value="4">4 passengers</option>
            <option value="5">5 passengers</option>
            <option value="6">6 passengers</option>
            <option value="7">7 passengers</option>
          </select>
        </section>
      )}

      {step === 2 && (
        <section className="wizard-section">
          <h3>Vehicle ownership</h3>
          <p>
            You may register a vehicle you own or one you are authorised
            to use.
          </p>

          <label className="wizard-choice">
            <input
              type="radio"
              name="vehicle-ownership"
              checked={form.ownership === "own"}
              onChange={() => updateField("ownership", "own")}
            />
            <span>
              <strong>I own this vehicle</strong>
              <small>I am the vehicle owner.</small>
            </span>
          </label>

          <label className="wizard-choice">
            <input
              type="radio"
              name="vehicle-ownership"
              checked={form.ownership === "authorised"}
              onChange={() => updateField("ownership", "authorised")}
            />
            <span>
              <strong>I am authorised to use this vehicle</strong>
              <small>
                The vehicle belongs to someone else, and I have their
                permission to use it.
              </small>
            </span>
          </label>

          {form.ownership === "authorised" && (
            <>
              <label htmlFor="owner-name">Vehicle owner's full name</label>
              <input
                id="owner-name"
                value={form.ownerName}
                onChange={(e) => updateField("ownerName", e.target.value)}
                placeholder="Enter the owner's name"
                required
              />

              <label htmlFor="owner-phone">Vehicle owner's phone number</label>
              <input
                id="owner-phone"
                type="tel"
                value={form.ownerPhone}
                onChange={(e) => updateField("ownerPhone", e.target.value)}
                placeholder="Enter the owner's contact number"
                required
              />

              <label className="wizard-choice">
                <input
                  type="checkbox"
                  checked={form.permissionConfirmed}
                  onChange={(e) =>
                    updateField("permissionConfirmed", e.target.checked)
                  }
                />
                <span>
                  I confirm that I have permission to use this vehicle for
                  the intended SafeRide service.
                </span>
              </label>
            </>
          )}
        </section>
      )}

      {step === 3 && (
        <section className="wizard-section">
          <h3>Driver and vehicle documents</h3>
          <p>
            This is a preparation checklist, not an official verification.
            Only provide documents through a secure, approved process.
          </p>

          <label htmlFor="licence-number">Driving licence number</label>
          <input
            id="licence-number"
            value={form.licenceNumber}
            onChange={(e) => updateField("licenceNumber", e.target.value)}
            placeholder="Enter your licence number"
            required
          />

          <label className="wizard-choice">
            <input
              type="checkbox"
              checked={form.hasDriversLicence}
              onChange={(e) =>
                updateField("hasDriversLicence", e.target.checked)
              }
            />
            <span>
              I have a valid driving licence and can provide it for review.
            </span>
          </label>

          <label className="wizard-choice">
            <input
              type="checkbox"
              checked={form.hasVehicleDocuments}
              onChange={(e) =>
                updateField("hasVehicleDocuments", e.target.checked)
              }
            />
            <span>
              I can provide the vehicle registration documents.
            </span>
          </label>

          {form.ownership === "authorised" && (
            <label className="wizard-choice">
              <input
                type="checkbox"
                checked={form.hasPermissionProof}
                onChange={(e) =>
                  updateField("hasPermissionProof", e.target.checked)
                }
              />
              <span>
                I can provide suitable proof of the owner's permission.
              </span>
            </label>
          )}

          <label className="wizard-choice">
            <input
              type="checkbox"
              checked={form.hasOtherRequiredDocuments}
              onChange={(e) =>
                updateField("hasOtherRequiredDocuments", e.target.checked)
              }
            />
            <span>
              I understand that additional documents or checks may be required
              before I can accept rides.
            </span>
          </label>
        </section>
      )}

      {step === 4 && (
        <section className="wizard-section">
          <h3>Review your application</h3>
          <p>Check your details before completing this demo.</p>

          <div className="wizard-review">
            <h4>Personal details</h4>
            <p><strong>Name:</strong> {form.fullName}</p>
            <p><strong>Email:</strong> {form.email}</p>
            <p><strong>Phone:</strong> {form.phone}</p>
            <p><strong>Area:</strong> {form.area}</p>

            <h4>Vehicle details</h4>
            <p><strong>Vehicle:</strong> {form.vehicleMake} {form.vehicleModel}</p>
            <p><strong>Year:</strong> {form.vehicleYear}</p>
            <p><strong>Colour:</strong> {form.vehicleColour}</p>
            <p><strong>Number plate:</strong> {form.numberPlate}</p>
            <p><strong>Passenger seats:</strong> {form.passengerSeats}</p>

            <h4>Ownership</h4>
            <p>
              <strong>Type:</strong>{" "}
              {form.ownership === "own" ? "Own vehicle" : "Authorised vehicle"}
            </p>

            {form.ownership === "authorised" && (
              <>
                <p><strong>Owner:</strong> {form.ownerName}</p>
                <p><strong>Owner phone:</strong> {form.ownerPhone}</p>
              </>
            )}

            <h4>Documents</h4>
            <p>
              <strong>Driving licence:</strong>{" "}
              {form.hasDriversLicence ? "Checklist confirmed" : "Not confirmed"}
            </p>
            <p>
              <strong>Vehicle documents:</strong>{" "}
              {form.hasVehicleDocuments ? "Checklist confirmed" : "Not confirmed"}
            </p>
          </div>

          <p className="wizard-note">
            Completing this demo does not submit a real application, verify
            documents, or approve you as a driver.
          </p>
        </section>
      )}

      {error && (
        <p className="form-message" role="alert">
          {error}
        </p>
      )}

      <div className="wizard-actions">
        <button
          className="secondary-button"
          type="button"
          onClick={handleBack}
          disabled={step === 0}
        >
          Back
        </button>

        {step < steps.length - 1 ? (
          <button
            className="primary-button"
            type="button"
            onClick={handleNext}
          >
            Next
          </button>
        ) : (
          <button
            className="primary-button"
            type="button"
            onClick={handleSubmit}
          >
            Complete demo
          </button>
        )}
      </div>
    </div>
  );
}

export default DriverRegistration;
