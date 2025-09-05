import CourseRecommendationClientPage from "./client-page";

export default function CourseRecommendationPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline">AI Course Recommendations</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Get personalized course suggestions from our AI career advisor to bridge your skill gaps and land your dream job.
        </p>
      </div>
      <CourseRecommendationClientPage />
    </div>
  );
}
