import { statesOfNigeria } from "../util/states";
import Btn from "../components/UI/Btn";
import Alert from "../components/UI/Alert";

const RegistrationForm = ({ formData, handleChange, handleSubmit, loading, error, plans, setFormData }: any) => {
	return (

    <form onSubmit={handleSubmit} className="space-y-6">
    <div>
      <label htmlFor="plan" className="inputLabel">
        Membership Plan
      </label>
      <select id="plan" value={formData.plan} onChange={handleChange} className="input">
        <option value="none">Select a Plan</option>
        {plans.map((plan:any) => (
          <option key={plan.id} value={plan.id}>
            {plan.name} - ₦{plan.amount.toLocaleString('en-US')}
          </option>
        ))}
      </select>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-5">
      <div>
        <label htmlFor="firstName" className="inputLabel">
          First Name
        </label>
        <input
          id="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="input"
          type="text"
          required
        />
      </div>

      <div>
        <label htmlFor="lastName" className="inputLabel">
          Last Name
        </label>
        <input
          id="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="input"
          type="text"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="inputLabel">
          Email
        </label>
        <input
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="input"
          type="email"
          required
        />
      </div>

      <div>
        <label htmlFor="dateOfBirth" className="inputLabel">
          Date Of Birth
        </label>
        <input
          id="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          className="input"
          type="date"
          required
        />
      </div>

      <div>
        <label htmlFor="gender" className="inputLabel">
          Gender
        </label>
        <select
          id="gender"
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          className="input"
          required
        >
          <option value="none">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="phoneNumber" className="inputLabel">
          Phone Number
        </label>
        <input
          id="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="input"
          type="tel"
          required
        />
      </div>
    </div>

    <div>
      <label htmlFor="street" className="inputLabel">
        Street Address
      </label>
      <input
        id="street"
        value={formData.address.street}
        onChange={handleChange}
        className="input"
        type="text"
        required
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label htmlFor="city" className="inputLabel">
          City
        </label>
        <input
          id="city"
          value={formData.address.city}
          onChange={handleChange}
          className="input"
          type="text"
          required
        />
      </div>

      <div>
        <label htmlFor="state" className="inputLabel">
          State
        </label>
        <select
          id="state"
          value={formData.address.state}
          onChange={handleChange}
          className="input"
          required
        >
          {statesOfNigeria.map((state, i) => (
            <option key={i} value={state.value}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="zipCode" className="inputLabel">
          ZIP Code
        </label>
        <input
          id="zipCode"
          value={formData.address.zipCode}
          onChange={handleChange}
          className="input"
          type="text"
          required
        />
      </div>
    </div>
    

    {error && <Alert type="danger" message={error} />}

    <Btn type="auth" label="Register" disabled={loading} btnAction="submit"/>
  </form>
	);
};

export default RegistrationForm;
