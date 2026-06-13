import "./SubscriptionForm.css";

function SubscriptionForm({
  formData,
  handleChange,
  saveSubscription
}) {

  return (

    <form
      className="subscription-form"
      onSubmit={saveSubscription}
    >

      <div className="form-title">
        Digital Subscription Entry
      </div>

      <input
        required
        placeholder="Subscriber Name"
        name="subscriber_name"
        value={formData.subscriber_name}
        onChange={handleChange}
      />

      <input
        required
        type="email"
        placeholder="Email Address"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        required
        pattern="[0-9]{10}"
        placeholder="Phone Number"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />

      <select
        required
        name="plan"
        value={formData.plan}
        onChange={handleChange}
      >
        <option value="">
          Select Plan
        </option>

        <option>Basic</option>
        <option>Premium</option>
        <option>Enterprise</option>
        <option>Trial</option>
      </select>

      <select
        required
        name="access_level"
        value={formData.access_level}
        onChange={handleChange}
      >
        <option value="">
          Select Access Level
        </option>

        <option>Basic</option>
        <option>Premium</option>
        <option>Enterprise</option>
      </select>

      <select
        required
        name="access_type"
        value={formData.access_type}
        onChange={handleChange}
      >
        <option value="">
          Select Access Type
        </option>

        <option>Website</option>
        <option>Mobile App</option>
        <option>Premium Articles</option>
        <option>Research Content</option>
        <option>Video Library</option>
      </select>

      <select
        name="renewal_type"
        value={formData.renewal_type || ""}
        onChange={handleChange}
      >
        <option value="">
          Renewal Type
        </option>

        <option>Monthly</option>
        <option>Quarterly</option>
        <option>Yearly</option>
      </select>

      <input
        type="number"
        placeholder="Trial Days"
        name="trial_days"
        min="0"
        value={formData.trial_days || 0}
        onChange={handleChange}
      />

      <input
        required
        type="number"
        placeholder="Monthly Cost (₹)"
        name="monthly_cost"
        value={formData.monthly_cost}
        onChange={handleChange}
      />

      <div>
        <label>
          Start Date
        </label>

        <input
          required
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>
          End Date
        </label>

        <input
          required
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
        />
      </div>

      <select
        required
        name="payment_status"
        value={formData.payment_status}
        onChange={handleChange}
      >
        <option value="">
          Payment Status
        </option>

        <option>Paid</option>
        <option>Pending</option>
        <option>Overdue</option>
      </select>

      <div>
        <label>
          Last Payment Date
        </label>

        <input
          type="date"
          name="last_payment_date"
          value={formData.last_payment_date}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>
          Next Billing Date
        </label>

        <input
          required
          type="date"
          name="next_billing_date"
          value={formData.next_billing_date}
          onChange={handleChange}
        />
      </div>

      <select
        required
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
        <option>Active</option>
        <option>Expired</option>
        <option>Trial</option>
      </select>

      <button
        type="submit"
        className="save-btn"
      >
        💾 Save Subscription
      </button>

    </form>

  );

}

export default SubscriptionForm;