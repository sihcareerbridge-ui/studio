
import CourseRecommendationClientPage from "./client-page";

export default function CourseRecommendationPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline">AI Career Advisor</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Take a short quiz to discover your personality and interests, and get personalized recommendations for tech careers and courses.
        </p>
      </div>
      <CourseRecommendationClientPage />
    </div>
  );
}
