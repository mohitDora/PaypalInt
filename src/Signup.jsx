import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react"
import { getAuth, createUserWithEmailAndPassword,signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import app from "./firebase";


export function Signup({user}) {
  const auth = getAuth(app);
  const [isLoading,seIsLoading]=useState(false);
  const [isLoadingGoogle,seIsLoadingGoogle]=useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

    const googleProvider = new GoogleAuthProvider();

    // Handle Google Sign-In
    const handleGoogleSignIn = async () => {
      try {
        seIsLoadingGoogle(true)
        const result = await signInWithPopup(auth, googleProvider);
        // Handle successful sign-in
        console.log(result.user);
        window.location.href = '/';
        seIsLoadingGoogle(false)
      } catch (error) {
        seIsLoadingGoogle(false)
        alert(error.message);
      }
    };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      seIsLoading(true)
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      window.location.href = '/';
      seIsLoading(false);

    } catch (error) {
      seIsLoading(false)
      alert(error.message);
    }
  };
  if(user){
    return <Navigate to="/"/>
  }
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  name="firstName"
                  placeholder="Max"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  name="lastName"
                  placeholder="Robinson"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {
              isLoading?<Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>: <Button type="submit" className="w-full">
              Create an account
            </Button>
            }
            {
              isLoadingGoogle?<Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>: <Button variant="outline" onClick={handleGoogleSignIn} className="w-full">
              Sign up with Google
            </Button>
            }
           
            
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/signin" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
