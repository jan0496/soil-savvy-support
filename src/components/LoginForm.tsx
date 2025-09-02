import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Leaf, Sprout, TreePine, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    phone: "",
    landArea: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      toast({
        title: "Welcome back!",
        description: "Successfully logged in to FarmWise Advisory",
      });
    } else {
      if (!date) {
        toast({
          title: "Missing Information",
          description: "Please select your date of birth",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Account Created!",
        description: "Welcome to FarmWise Advisory Platform",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-field p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-full shadow-glow mb-4">
            <Sprout className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">FarmWise</h1>
          <p className="text-muted-foreground">Smart Agricultural Advisory</p>
        </div>

        {/* Form Card */}
        <div className="bg-card rounded-xl shadow-medium p-8">
          {/* Tab Switcher */}
          <div className="flex mb-6 bg-muted rounded-lg p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={cn(
                "flex-1 py-2 px-4 rounded-md transition-all duration-300",
                isLogin
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={cn(
                "flex-1 py-2 px-4 rounded-md transition-all duration-300",
                !isLogin
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Create Account
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username" className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="bg-input border-border focus:border-primary transition-all duration-300"
              />
            </div>

            {/* Name - Only for Registration */}
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-primary" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="bg-input border-border focus:border-primary transition-all duration-300"
                />
              </div>
            )}

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="bg-input border-border focus:border-primary transition-all duration-300"
              />
            </div>

            {/* Registration Fields */}
            {!isLogin && (
              <>
                {/* Phone Number */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="bg-input border-border focus:border-primary transition-all duration-300"
                  />
                </div>

                {/* Date of Birth */}
                <div className="space-y-2">
                  <Label>Date of Birth</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick your birth date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-popover">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => 
                          date > new Date() || date < new Date("1900-01-01")
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Land Area */}
                <div className="space-y-2">
                  <Label htmlFor="landArea" className="flex items-center gap-2">
                    <TreePine className="w-4 h-4 text-primary" />
                    Land Area Location
                  </Label>
                  <Input
                    id="landArea"
                    name="landArea"
                    type="text"
                    placeholder="e.g., Village name, District, State"
                    value={formData.landArea}
                    onChange={handleInputChange}
                    required
                    className="bg-input border-border focus:border-primary transition-all duration-300"
                  />
                </div>
              </>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              variant="agricultural"
              size="lg"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </Button>

            {/* Additional Links */}
            {isLogin && (
              <div className="text-center text-sm">
                <a href="#" className="text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
            )}
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-border text-center text-sm text-muted-foreground">
            {isLogin ? (
              <p>
                New to FarmWise?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-primary hover:underline font-medium"
                >
                  Create an account
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Bottom Info */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Empowering farmers with intelligent agricultural insights
        </p>
      </div>
    </div>
  );
}