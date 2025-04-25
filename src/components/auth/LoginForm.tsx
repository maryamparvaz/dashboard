
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Lock } from "lucide-react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 p-4">
      <Card className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-1000 shadow-xl border-purple-100 dark:border-none">
        <form onSubmit={handleSubmit}>
          <CardHeader className="space-y-3 text-center pb-8">
            <div className="mx-auto w-16 h-16 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mb-2">
              <Lock className="w-8 h-8 text-purple-600 dark:text-purple-300" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-br from-purple-600 to-purple-800 dark:from-purple-300 dark:to-purple-500 bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-purple-600/80 dark:text-purple-300/80 text-base">
              Sign in to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
            <CardDescription className="text-purple-600/80 dark:text-purple-300/80 text-base">
              Username : admin@example.com 
            </CardDescription>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-purple-500/60 dark:text-purple-400/60" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/50 dark:bg-purple-950/50 border-purple-100 dark:border-purple-800 focus-visible:ring-purple-500/50 dark:focus-visible:ring-purple-400/50"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
            <CardDescription className="text-purple-600/80 dark:text-purple-300/80 text-base">
              Password : 1234
            </CardDescription>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-purple-500/60 dark:text-purple-400/60" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-white/50 dark:bg-purple-950/50 border-purple-100 dark:border-purple-800 focus-visible:ring-purple-500/50 dark:focus-visible:ring-purple-400/50"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 dark:from-purple-500 dark:to-purple-600 dark:hover:from-purple-600 dark:hover:to-purple-700 text-white shadow-lg shadow-purple-500/25 dark:shadow-purple-800/20"
            >
              Sign in
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
