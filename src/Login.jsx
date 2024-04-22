import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import app from "./firebase";
import { Loader2 } from "lucide-react";

export function LoginForm({user}) {
  const auth = getAuth(app);
  const [isLoading,seIsLoading]=useState(false);
  const [isLoadingGoogle,seIsLoadingGoogle]=useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
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
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      seIsLoading(true);
      await signInWithEmailAndPassword(auth,email,password);
      seIsLoading(false)
    } catch (error) {
      seIsLoading(false)
      alert(error.message)
    }
  };
if(user){
  return <Navigate to="/"/>
}
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            {
              isLoading?<Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>: <Button type="submit" className="w-full">
              Login
            </Button>
            }
            {
              isLoadingGoogle?<Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>: <Button variant="outline" onClick={handleGoogleSignIn} className="w-full">
              Sign in with Google
            </Button>
            }
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
