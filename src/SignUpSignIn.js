import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { Card, CardContent } from "./components/ui/card"; 

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate(); // Initialize navigate

  const toggleMode = () => setIsSignUp(!isSignUp);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignUp ? "http://localhost:8080/api/users/signup" : "http://localhost:8080/login";
    
    try {
      const response = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "application/json" },
      });
  
      alert(isSignUp ? "Sign-up successful!" : "Sign-in successful!");
  
      if (isSignUp) {
        // Redirect to /user immediately after sign-up
        localStorage.setItem("role", "user");
        navigate("/user");
      } else {
        // Handle login
        if (response.data.role === "admin") {
          localStorage.setItem("role", "admin");
          navigate("/admin");
        } else if (response.data.role === "user") {
          localStorage.setItem("role", "user");
          navigate("/user");
        } else {
          alert("Invalid credentials");
        }
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };
  

  return (
    <div className="card">
      <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <div className="separator">
          <hr />
          <span>or</span>
          <hr />
        </div>
        <button className="google-button">
          <FcGoogle /> Sign in with Google
        </button>
        <p className="text-sm text-center mt-4">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <span className="toggle-link" onClick={toggleMode}>
            {isSignUp ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </CardContent>
    </div>
  );
}



 //updated



// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FcGoogle } from "react-icons/fc";
// import { Card, CardContent } from "./components/ui/card";

// export default function AuthPage() {
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [formData, setFormData] = useState({ username: "", email: "", password: "" });
//   const navigate = useNavigate();

//   const toggleMode = () => setIsSignUp(!isSignUp);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const endpoint = isSignUp ? "http://localhost:8080/api/users/signup" : "http://localhost:8080/login";
//     try {
//       const response = await axios.post(endpoint, formData, {
//         headers: { "Content-Type": "application/json" },
//       });
//       alert(response.data.message);
//       console.log(formData);
//       console.log(response.data.role);
//       if (response.data.role === "admin") navigate("/admin");
//       else if (response.data.role === "user") navigate("/user");
//     } catch (error) {
//       alert(error.response?.data?.message || "Something went wrong");
//     }
//   };



//   return (
//     <div className="card">
//       <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {isSignUp && (
//             <div className="form-group">
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           )}
//           <div className="form-group">
//             <input
//               type="text"
//               name="username"
//               placeholder="Username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <button type="submit">
//             {isSignUp ? "Sign Up" : "Sign In"}
//           </button>
//         </form>
//         <div className="separator">
//           <hr />
//           <span>or</span>
//           <hr />
//         </div>
//         <button className="google-button">
//           <FcGoogle /> Sign in with Google
//         </button>
//         <p className="text-sm text-center mt-4">
//           {isSignUp ? "Already have an account? " : "Don't have an account? "}
//           <span className="toggle-link" onClick={toggleMode}>
//             {isSignUp ? "Sign In" : "Sign Up"}
//           </span>
//         </p>
//       </CardContent>
//     </div>
//   );
// }
