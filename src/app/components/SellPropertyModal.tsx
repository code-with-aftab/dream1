'use client';

import { useState } from 'react';
import { X, Upload, CheckCircle2, AlertCircle, Building2, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SellPropertyModalProps {
  onClose: () => void;
}

export default function SellPropertyModal({ onClose }: SellPropertyModalProps) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propTitle: '',
    propType: 'Plot',
    propLocation: 'Shimla Bypass Road',
    propPrice: '',
    propSize: '',
    propRoadWidth: '25 Ft Cemented',
    requirements: '',
    propImage: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });

      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      
      setFormData((prev) => ({ ...prev, propImage: data.url }));
    } catch (err: any) {
      console.error('Image upload error:', err);
      setError('Failed to upload property image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.propTitle || !formData.propPrice || !formData.propSize) {
      setError('Please fill in all required (*) fields.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || 'dreamlandassociate7@gmail.com',
          requirements: `[SELL PROPERTY REQUEST]\nTitle: ${formData.propTitle}\nType: ${formData.propType}\nLocation: ${formData.propLocation}\nSize: ${formData.propSize}\nPrice: ${formData.propPrice}\nRoad Width: ${formData.propRoadWidth}\nRemarks: ${formData.requirements}`,
          inquiryType: 'Sell',
          propTitle: formData.propTitle,
          propType: formData.propType,
          propLocation: formData.propLocation,
          propPrice: formData.propPrice,
          propSize: formData.propSize,
          propRoadWidth: formData.propRoadWidth,
          propImage: formData.propImage,
        }),
      });

      if (!res.ok) throw new Error('Failed to submit listing');
      setStep('success');
    } catch (err: any) {
      console.error('Form submit error:', err);
      setError('Failed to submit your property details. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-stone-900 rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 dark:border-stone-850 animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/20">
          <div>
            <h3 className="font-serif text-lg sm:text-xl text-stone-900 dark:text-white font-normal">
              List Your Property For Sale
            </h3>
            <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-0.5">
              Dreamsland Private Acquisition Desk
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-stone-800 dark:text-stone-300">
            
            {error && (
              <div className="flex items-center space-x-2 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 p-3 rounded-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Owner Section */}
            <div className="space-y-4">
              <h4 className="font-serif text-sm font-semibold text-stone-900 dark:text-stone-100 border-b border-stone-100 dark:border-stone-850 pb-2">
                1. Owner Coordinates
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Nitin Katoch"
                    className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-sm py-2 px-3 text-xs focus:outline-none focus:border-gold-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-1.5">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. 9258884941"
                    className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-sm py-2 px-3 text-xs focus:outline-none focus:border-gold-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. client@gmail.com"
                    className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-sm py-2 px-3 text-xs focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>
            </div>

            {/* Property Logistics */}
            <div className="space-y-4 pt-2">
              <h4 className="font-serif text-sm font-semibold text-stone-900 dark:text-stone-100 border-b border-stone-100 dark:border-stone-850 pb-2">
                2. Property Logistics
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-1.5">
                    Property Title / Short Name *
                  </label>
                  <input
                    type="text"
                    name="propTitle"
                    value={formData.propTitle}
                    onChange={handleInputChange}
                    placeholder="e.g. 3 Bigha Farm Land near Shimla Bypass"
                    className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-sm py-2 px-3 text-xs focus:outline-none focus:border-gold-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-1.5">
                      Property Type
                    </label>
                    <select
                      name="propType"
                      value={formData.propType}
                      onChange={handleInputChange}
                      className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-sm py-2 px-3 text-xs focus:outline-none focus:border-gold-500"
                    >
                      <option value="Plot">Residential Plot</option>
                      <option value="Villa">Villa / House</option>
                      <option value="Agricultural">Agricultural Land</option>
                      <option value="Commercial">Commercial Plot</option>
                      <option value="Other">Other Property</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-1.5">
                      Location Corridor
                    </label>
                    <select
                      name="propLocation"
                      value={formData.propLocation}
                      onChange={handleInputChange}
                      className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-sm py-2 px-3 text-xs focus:outline-none focus:border-gold-500"
                    >
                      <option value="Shimla Bypass Road">Shimla Bypass Corridor</option>
                      <option value="Premnagar Corridor">Premnagar / Bhauwala</option>
                      <option value="Selaqui Corridor">Selaqui Industrial</option>
                      <option value="Raipur Corridor">Raipur / Sahastradhara</option>
                      <option value="Doiwala Zone">Doiwala / Lachiwala</option>
                      <option value="Other Dehradun">Other Dehradun Areas</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-1.5">
                    Asking Price (INR) *
                  </label>
                  <input
                    type="text"
                    name="propPrice"
                    value={formData.propPrice}
                    onChange={handleInputChange}
                    placeholder="e.g. 45 Lakhs or 1.2 Crore"
                    className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-sm py-2 px-3 text-xs focus:outline-none focus:border-gold-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-1.5">
                    Property Size / Area *
                  </label>
                  <input
                    type="text"
                    name="propSize"
                    value={formData.propSize}
                    onChange={handleInputChange}
                    placeholder="e.g. 150 Gaj or 2 Bigha"
                    className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-sm py-2 px-3 text-xs focus:outline-none focus:border-gold-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-1.5">
                    Connecting Road Width
                  </label>
                  <select
                    name="propRoadWidth"
                    value={formData.propRoadWidth}
                    onChange={handleInputChange}
                    className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-sm py-2.5 px-3 text-xs focus:outline-none focus:border-gold-500"
                  >
                    <option value="20 Ft Cemented">20 Ft Road</option>
                    <option value="25 Ft Cemented">25 Ft Road</option>
                    <option value="30 Ft RCC">30 Ft RCC Road</option>
                    <option value="35+ Ft Highway">35+ Ft Highway Touch</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Photos & Remarks */}
            <div className="space-y-4 pt-2">
              <h4 className="font-serif text-sm font-semibold text-stone-900 dark:text-stone-100 border-b border-stone-100 dark:border-stone-850 pb-2">
                3. Additional Details & Representative Photo
              </h4>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-1.5">
                  Property Description / Mutation status / Comments
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Tell us about the property (e.g. boundary wall done, registry clear, electricity coordinates available, etc.)"
                  className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-sm py-2 px-3 text-xs focus:outline-none focus:border-gold-500"
                />
              </div>

              {/* Cloudinary Image Uploader */}
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-2">
                  Property Representative Image
                </label>
                <div className="flex items-center space-x-6">
                  {formData.propImage ? (
                    <div className="relative w-32 h-20 rounded-md border border-stone-200 dark:border-stone-800 overflow-hidden shrink-0 group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={formData.propImage}
                        alt="Property Preview"
                        className="object-cover w-full h-full"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, propImage: '' }))}
                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-bold transition-opacity cursor-pointer"
                      >
                        Change Photo
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-32 h-20 border-2 border-dashed border-stone-300 dark:border-stone-800 hover:border-gold-500 rounded-md cursor-pointer transition-colors bg-stone-50/50 dark:bg-stone-950/20 text-stone-400 hover:text-gold-500">
                      <Upload className="w-5 h-5 mb-1" />
                      <span className="text-[9px] uppercase font-bold tracking-wider">Select Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}

                  <div className="text-[10px] text-stone-400 leading-normal space-y-1">
                    <p className="font-semibold text-stone-500 dark:text-stone-450">Upload guidelines:</p>
                    <p>• Clean photo of plot frontage or road corridor</p>
                    <p>• Max file size: 5MB (JPG, PNG)</p>
                    {uploading && (
                      <p className="text-gold-500 font-bold animate-pulse">Uploading to Cloudinary...</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Block */}
            <div className="pt-4 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 rounded-sm border border-stone-200 dark:border-stone-800 text-stone-500 hover:text-stone-700 hover:bg-stone-50 dark:hover:bg-stone-950/50 cursor-pointer font-bold uppercase tracking-wider text-[10px] transition-colors"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-gold-500 hover:bg-gold-600 text-stone-955 px-7 py-3 rounded-sm shadow-md font-bold uppercase tracking-widest text-[10px] transition-all flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
                disabled={submitting || uploading}
              >
                {submitting ? (
                  <>
                    <Building2 className="w-4 h-4 animate-spin" />
                    <span>Registering...</span>
                  </>
                ) : (
                  <span>Submit Listing</span>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="p-12 text-center flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-300">
            <div className="relative w-36 h-12 mb-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Dreamland Associates Logo"
                className="object-contain h-10 mx-auto"
              />
            </div>
            <CheckCircle2 className="w-10 h-10 text-emerald-500 animate-bounce" />
            <h4 className="font-serif text-2xl text-stone-900 dark:text-white font-normal">
              Listing Submitted Successfully!
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 max-w-md leading-relaxed">
              Thank you for listing your property with Dreamsland Associates. Our Dehradun project acquisition 
              representatives will review your details, verify the coordinates, and connect with you shortly.
            </p>
            <Button
              onClick={onClose}
              className="bg-stone-900 hover:bg-gold-600 text-white dark:bg-white dark:text-stone-950 dark:hover:bg-gold-600 dark:hover:text-white px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.14em] cursor-pointer transition-colors"
            >
              Close Window
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
