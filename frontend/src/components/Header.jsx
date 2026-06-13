function Header() {

  const today = new Date();

  return (

    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "20px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}
    >

      <h2>
        Welcome Admin 👋
      </h2>

     

      <small>
        {today.toDateString()}
      </small>

    </div>

  );

}

export default Header;