
'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { FlaskConical, PlayCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Progress } from '@/components/ui/progress';

const initialPlacementData = [
    { name: 'Aspirational', "Current": 85, "Simulated": 85 },
    { name: 'Rural', "Current": 86, "Simulated": 86 },
    { name: 'Urban', "Current": 84, "Simulated": 84 },
    { name: 'Female', "Current": 85, "Simulated": 85 },
    { name: 'Male', "Current": 85, "Simulated": 85 },
];

export default function SimulatorPage() {
    const [weights, setWeights] = useState({
        skillMatch: 60,
        preference: 25,
        fairness: 15,
    });
    const [simulatedData, setSimulatedData] = useState(initialPlacementData);
    const [isSimulating, setIsSimulating] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleRunSimulation = () => {
        setIsSimulating(true);
        setProgress(0);

        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setIsSimulating(false);
                     // Create new simulated data based on weights
                    setSimulatedData(initialPlacementData.map(item => ({
                        ...item,
                        "Simulated": Math.min(100, Math.round(item.Current * (1 + (weights.fairness - 15) / 100 * (Math.random() * 0.2 + 0.1)))),
                    })));
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
    }
    
    return (
        <div className="container mx-auto py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">What-If Simulator</h1>
                <p className="text-muted-foreground">
                Adjust allocation parameters to see their potential impact on fairness and outcomes.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><FlaskConical/> Policy Levers</CardTitle>
                            <CardDescription>Adjust the weights for different factors in the allocation algorithm.</CardDescription>
                        </CardHeader>
                         <CardContent className="space-y-8">
                            <div className="space-y-3">
                                <Label htmlFor="skill-weight">Skill Match Weight ({weights.skillMatch}%)</Label>
                                <Slider id="skill-weight" value={[weights.skillMatch]} onValueChange={(val) => setWeights(w => ({...w, skillMatch: val[0]}))} max={100} step={5} />
                                <p className="text-xs text-muted-foreground">How much to prioritize matching student skills to internship requirements.</p>
                            </div>
                             <div className="space-y-3">
                                <Label htmlFor="pref-weight">Student Preference Weight ({weights.preference}%)</Label>
                                <Slider id="pref-weight" value={[weights.preference]} onValueChange={(val) => setWeights(w => ({...w, preference: val[0]}))} max={100} step={5} />
                                 <p className="text-xs text-muted-foreground">How much to prioritize students' ranked internship preferences.</p>
                            </div>
                             <div className="space-y-3">
                                <Label htmlFor="fair-weight">Fairness Boost ({weights.fairness}%)</Label>
                                <Slider id="fair-weight" value={[weights.fairness]} onValueChange={(val) => setWeights(w => ({...w, fairness: val[0]}))} max={100} step={5} />
                                 <p className="text-xs text-muted-foreground">How much to boost candidates from underrepresented groups (e.g., Aspirational Districts).</p>
                            </div>
                        </CardContent>
                        <CardFooter>
                           <Button className="w-full" size="lg" onClick={handleRunSimulation} disabled={isSimulating}>
                               {isSimulating ? <><Loader2 className="mr-2 animate-spin"/> Simulating...</> : <><PlayCircle className="mr-2"/> Run Simulation</>}
                           </Button>
                        </CardFooter>
                    </Card>
                </div>
                 <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Simulated Outcomes</CardTitle>
                            <CardDescription>Comparison of current allocation vs. simulated allocation based on your new weights.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {isSimulating && (
                                <div className="space-y-2">
                                    <Progress value={progress} />
                                    <p className="text-sm text-center text-muted-foreground">Calculating new potential outcomes...</p>
                                </div>
                            )}
                            <ResponsiveContainer width="100%" height={400}>
                               <BarChart data={simulatedData}>
                                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`}/>
                                    <Tooltip
                                        formatter={(value) => `${value}%`}
                                        cursor={{ fill: 'hsl(var(--secondary))' }}
                                        contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                                    />
                                    <Legend />
                                    <Bar dataKey="Current" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="Simulated" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
