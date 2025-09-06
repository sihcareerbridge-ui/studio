
'use client';

import React, { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { hostProfile, internships } from "@/lib/demo-data";
import { Briefcase, Building, Mail, MapPin, Pencil, Phone, Upload, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
  } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Slider } from '@/components/ui/slider';


export default function HostProfilePage() {
    const activeInternships = internships.slice(0, 3);
    const [imgSrc, setImgSrc] = useState('');
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<Crop>();
    const [scale, setScale] = useState(1);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined) // Makes crop preview update between images.
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                setImgSrc(reader.result?.toString() || ''),
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        const { width, height } = e.currentTarget;
        const crop = centerCrop(
            makeAspectCrop(
                {
                    unit: '%',
                    width: 90,
                },
                1,
                width,
                height,
            ),
            width,
            height,
        );
        setCrop(crop);
        setCompletedCrop(crop);
    }
    
    const handleSave = () => {
        // In a real app, you would upload the cropped image here.
        // For now, we'll just log the crop data and close the dialog.
        console.log('Saved crop:', completedCrop);
        setIsDialogOpen(false);
        // Reset state
        setImgSrc('');
        setScale(1);
    }

    return (
        <div className="container mx-auto py-8 space-y-8">
             <div>
                <h1 className="text-3xl font-bold tracking-tight">Organization Profile</h1>
                <p className="text-muted-foreground">Manage your company's public information.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-1 space-y-8">
                    <Card>
                        <CardHeader className="items-center text-center">
                            <Image
                                src={hostProfile.logoUrl}
                                alt={`${hostProfile.name} logo`}
                                width={96}
                                height={96}
                                className="rounded-full border p-2 mb-4"
                            />
                            <CardTitle>{hostProfile.name}</CardTitle>
                             <div className="flex items-center gap-2 mt-2">
                                <CheckBadgeIcon className="h-6 w-6 text-primary" />
                                <span className="text-sm font-medium text-primary">Verified by PM Internship Scheme</span>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="w-full"><Upload className="mr-2 h-4 w-4" /> Change Logo</Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>Update Logo</DialogTitle>
                                        <DialogDescription>
                                            Upload and crop your new organization logo.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                        <Input id="logo-upload" type="file" onChange={onFileChange} accept="image/*" />
                                        {imgSrc && (
                                            <div className='flex flex-col items-center space-y-4'>
                                                <ReactCrop
                                                    crop={crop}
                                                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                                                    onComplete={(c) => setCompletedCrop(c)}
                                                    aspect={1}
                                                    circularCrop
                                                >
                                                    <Image
                                                        ref={imgRef}
                                                        alt="Crop me"
                                                        src={imgSrc}
                                                        style={{ transform: `scale(${scale})` }}
                                                        onLoad={onImageLoad}
                                                        width={400}
                                                        height={400}
                                                        className="max-h-[400px] w-auto"
                                                    />
                                                </ReactCrop>
                                                <div className="w-full space-y-2">
                                                    <Label htmlFor="zoom">Zoom</Label>
                                                    <Slider
                                                        id="zoom"
                                                        defaultValue={[1]}
                                                        min={1}
                                                        max={3}
                                                        step={0.1}
                                                        value={[scale]}
                                                        onValueChange={(value) => setScale(value[0])}
                                                    />
                                                </div>
                                                <Button variant="outline" size="sm" onClick={() => setImgSrc('')}><Trash2 className="mr-2 h-4 w-4"/>Remove Image</Button>
                                            </div>
                                        )}
                                    </div>
                                    <DialogFooter>
                                         <DialogClose asChild>
                                            <Button type="button" variant="secondary">
                                            Cancel
                                            </Button>
                                        </DialogClose>
                                        <Button type="button" onClick={handleSave} disabled={!imgSrc}>Save</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div className="flex items-start gap-3">
                                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="font-medium">Email</p>
                                    <a href={`mailto:${hostProfile.email}`} className="text-muted-foreground hover:underline">{hostProfile.email}</a>
                                </div>
                            </div>
                             <div className="flex items-start gap-3">
                                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="font-medium">Phone</p>
                                    <p className="text-muted-foreground">{hostProfile.phone}</p>
                                </div>
                            </div>
                             <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="font-medium">Address</p>
                                    <p className="text-muted-foreground">{hostProfile.address}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div>
                <div className="md:col-span-2 space-y-8">
                    <Card>
                         <CardHeader className="flex flex-row items-center justify-between">
                            <div className="space-y-1.5">
                                <CardTitle>About {hostProfile.name}</CardTitle>
                                <CardDescription>Update your organization's description and details.</CardDescription>
                            </div>
                            <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                        </CardHeader>
                        <CardContent className="prose dark:prose-invert max-w-none">
                            <p>{hostProfile.bio}</p>
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader>
                            <CardTitle>Active Internships</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {activeInternships.map(internship => (
                                <div key={internship.id} className="flex items-center justify-between rounded-lg border p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-muted p-2 rounded-md">
                                            <Briefcase className="h-6 w-6 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <Link href={`/host/internships/${internship.id}/edit`} className="font-semibold hover:underline">{internship.title}</Link>
                                            <p className="text-sm text-muted-foreground">{internship.location}</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" asChild>
                                        <Link href={`/host/students?internshipId=${internship.id}`}>View Applicants</Link>
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

// Using a different icon for verification as CheckBadge is not in lucide-react by default
const CheckBadgeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.99 16.5a.75.75 0 00-1.98 0l-3.25 1.75a.75.75 0 00-.52 1.28L8.5 21.25a.75.75 0 001.06.06l3.25-3.25a.75.75 0 000-1.06l-1.75-1.75z"
      clipRule="evenodd"
    />
     <path
      fillRule="evenodd"
      d="M8.968 7.153a.75.75 0 01.992 0l1.263 1.264a.75.75 0 001.06 0l2.1-2.1a.75.75 0 111.06 1.06l-2.1 2.1a2.25 2.25 0 01-3.182 0l-1.263-1.264a.75.75 0 010-.992z"
      clipRule="evenodd"
    />
  </svg>
);
