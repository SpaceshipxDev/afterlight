"use client";

import React, { useState, useEffect } from 'react';
import { 
  UploadCloud, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  CheckCircle2, 
  Database, 
  Sparkles, 
  MessageSquare,
  Clock,
  Check,
  Expand,
  X,
  ChevronRight,
  Play
} from 'lucide-react';

// --- YOUR CUSTOM IMAGES ---
// Replace these URLs with your own to change the pre-loaded demo data.
const INITIAL_QUEUED_URLS = [
  "/demo-assets/CDL-2041012_20ft-Warm-White-Cluster-Large-Fairy-Light-String_SSC.webp", // Watch
  "/demo-assets/CDL-2041009_31ft-Cluster-Twinkly-Light-String_SSC.webp", // Watch 2
  "/demo-assets/Gemini_Generated_Image_o3jay0o3jay0o3ja.png", // Headphones
];

const INITIAL_COMPLETED_URLS = [
  "/demo-assets/WRG-2141034_Berry-Branches_Lifestyle-10.webp", // Perfume
  "/demo-assets/CDL-2041009_31ft-Cluster-Twinkly-Light-String_Closeup-10.webp", // Cosmetics
  "/demo-assets/OUT-2341015_Outdoor-Cascade-Tree-Light-String_SSC.webp"  // Serum
];

// --- MOCK DATA & TYPES ---
type AssetStatus = 'queued' | 'processing' | 'completed';

interface AssetItem {
  id: string;
  name: string;
  url: string;
  status: AssetStatus;
  progress?: number;
}

const generateInitialAssets = (): AssetItem[] => {
  // Only load the queued items on startup
  return INITIAL_QUEUED_URLS.map((url, i) => ({
    id: `q-${i}`,
    name: `raw_input_0${i + 1}.jpg`,
    url,
    status: 'queued' as AssetStatus
  }));
};

export default function WorkflowDashboard() {
  const [assets, setAssets] = useState<AssetItem[]>(generateInitialAssets());
  const [urlInput, setUrlInput] = useState('');
  const [reviewingAsset, setReviewingAsset] = useState<AssetItem | null>(null);
  const [isPipelineRunning, setIsPipelineRunning] = useState(false);

  // --- MANUAL PIPELINE LOGIC ---
  useEffect(() => {
    if (!isPipelineRunning) return;

    const processingAsset = assets.find(a => a.status === 'processing');
    const queuedAssets = assets.filter(a => a.status === 'queued');

    // If nothing is processing, but we have a queue, pull the next item
    if (!processingAsset && queuedAssets.length > 0) {
      setAssets(prev => prev.map(a => 
        a.id === queuedAssets[0].id ? { ...a, status: 'processing', progress: 0 } : a
      ));
    } else if (!processingAsset && queuedAssets.length === 0) {
      // Queue is empty, stop pipeline
      setIsPipelineRunning(false);
    }

    // Simulate progress for the current item
    if (processingAsset) {
      const interval = setInterval(() => {
        setAssets(prev => prev.map(a => {
          if (a.id === processingAsset.id) {
            // 5 progress every 200ms = 100 progress in 4000ms (4 seconds)
            const nextProgress = (a.progress || 0) + 5; 
            
            if (nextProgress >= 100) {
              // Find the corresponding completed image based on the input URL
              const urlIndex = INITIAL_QUEUED_URLS.indexOf(a.url);
              const finishedUrl = urlIndex !== -1 && INITIAL_COMPLETED_URLS[urlIndex] 
                ? INITIAL_COMPLETED_URLS[urlIndex] 
                : a.url; // Fallback to original url if it's a random drop

              return { 
                ...a, 
                status: 'completed', 
                progress: 100,
                url: finishedUrl, // Swap to the finished image
                name: a.name.replace('raw_input', 'generated_output').replace('.jpg', '.png')
              };
            }
            return { ...a, progress: nextProgress };
          }
          return a;
        }));
      }, 200); 
      return () => clearInterval(interval);
    }
  }, [assets, isPipelineRunning]);

  // --- ACTIONS ---
  const handleSimulateUpload = () => {
    const randomImg = INITIAL_QUEUED_URLS[Math.floor(Math.random() * INITIAL_QUEUED_URLS.length)];
    const newItem: AssetItem = {
      id: Math.random().toString(36).substring(7),
      name: `RAW_Drop_${Math.floor(Math.random() * 1000)}.jpg`,
      url: randomImg,
      status: 'queued'
    };
    setAssets(prev => [...prev, newItem]);
  };

  const handleUrlAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput) return;
    const newItem: AssetItem = {
      id: Math.random().toString(36).substring(7),
      name: `URL_Extraction_${Math.floor(Math.random() * 1000)}`,
      url: INITIAL_QUEUED_URLS[0], 
      status: 'queued'
    };
    setAssets(prev => [...prev, newItem]);
    setUrlInput('');
  };

  // --- DERIVED STATE ---
  const queued = assets.filter(a => a.status === 'queued');
  const processing = assets.find(a => a.status === 'processing');
  const completed = assets.filter(a => a.status === 'completed');

  return (
    <div className="flex h-screen w-full bg-[#FAFAFA] text-gray-900 font-sans overflow-hidden selection:bg-blue-100">
      
      {/* BACKGROUND GRID */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-40" 
        style={{
          backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* --- LEFT PANEL: INPUT SOURCE --- */}
      <aside className="relative z-10 w-[340px] bg-white/70 backdrop-blur-2xl border-r border-gray-200/60 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="p-6 pb-4 border-b border-gray-200/60 flex items-center justify-between">
          <div>
            <h1 className="text-base font-semibold tracking-tight">Input Source</h1>
            <p className="text-[13px] text-gray-500 mt-0.5">Drop assets to begin pipeline</p>
          </div>
          <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
            {queued.length}
          </div>
        </div>

        <div className="p-6 flex-1 space-y-6 overflow-y-auto custom-scrollbar">
          
          {/* Drag & Drop Zone */}
          <div 
            onClick={handleSimulateUpload}
            className="group relative border border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-blue-500 hover:bg-blue-50/30 transition-all cursor-pointer bg-gray-50/50"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity -z-10" />
            <div className="h-10 w-10 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
              <UploadCloud className="w-4 h-4 text-gray-600" />
            </div>
            <h3 className="text-[13px] font-medium text-gray-800">Click to mock upload</h3>
            <p className="text-[11px] text-gray-400 mt-1">PNG, JPG or HEIC</p>
          </div>

          {/* URL Input */}
          <form onSubmit={handleUrlAdd} className="space-y-2">
            <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Product URL</label>
            <div className="relative flex items-center">
              <LinkIcon className="w-3.5 h-3.5 text-gray-400 absolute left-3" />
              <input 
                type="text" 
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Paste store link..." 
                className="w-full bg-white border border-gray-200/80 text-[13px] rounded-xl py-2 pl-9 pr-10 focus:outline-none focus:ring-4 focus:ring-gray-100 focus:border-gray-400 transition-all shadow-sm"
              />
              <button type="submit" className="absolute right-2 p-1 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-600 transition-colors">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Queue List */}
          {queued.length > 0 && (
            <div className="space-y-2 pt-4 border-t border-gray-200/60">
              <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Up Next</h4>
              {queued.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => setReviewingAsset(item)}
                  className="flex items-center gap-3 bg-white border border-gray-200/60 p-2 rounded-xl shadow-sm animate-in fade-in slide-in-from-bottom-2 cursor-pointer group hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="h-9 w-9 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                    <img src={item.url} alt="mockup" className="w-full h-full object-cover opacity-70 grayscale group-hover:grayscale-0 transition-all duration-300" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <Expand className="w-3 h-3 text-white opacity-0 group-hover:opacity-100" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium text-gray-800 truncate">{item.name}</p>
                    <p className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> Queued
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Run Button Footer */}
        <div className="p-6 border-t border-gray-200/60 bg-gray-50/50">
          <button 
            onClick={() => setIsPipelineRunning(true)}
            disabled={isPipelineRunning || queued.length === 0}
            className="w-full py-3 bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 text-white rounded-xl text-[13px] font-semibold transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2"
          >
            {isPipelineRunning ? (
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" /> Processing...
              </span>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" /> Run Pipeline
              </>
            )}
          </button>
        </div>
      </aside>

      {/* --- CENTER PANEL: WORKFLOW CANVAS --- */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-10 overflow-hidden">
        
        {/* Pipeline Visualizer */}
        <div className="flex items-center justify-center w-full max-w-4xl relative">
          
          {/* Node 1: Ingestion */}
          <div className={`w-56 bg-white border rounded-2xl p-4 shadow-sm transition-all duration-500 z-10 ${processing ? 'border-blue-200 shadow-blue-100/50' : 'border-gray-200/80'}`}>
            <div className="flex items-center gap-2 mb-3">
              <div className={`p-1.5 rounded-md transition-colors ${processing ? 'bg-blue-50' : 'bg-gray-50'}`}>
                <ImageIcon className={`w-3.5 h-3.5 ${processing ? 'text-blue-500' : 'text-gray-500'}`} />
              </div>
              <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">In & Out</span>
            </div>
            {processing ? (
              <div className="animate-in fade-in zoom-in-95 duration-300">
                <p className="text-[12px] font-medium text-gray-900 truncate">{processing.name}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
                    <div className="bg-blue-500 h-1 rounded-full transition-all duration-300 ease-out" style={{ width: `${processing.progress}%` }} />
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium w-6">{processing.progress}%</span>
                </div>
              </div>
            ) : (
              <p className="text-[12px] text-gray-400 italic py-2">Waiting for input...</p>
            )}
          </div>

          {/* Connector Line */}
          <div className="flex-1 h-[2px] bg-gradient-to-r from-gray-200 to-gray-200 relative">
            {processing && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent w-full animate-[shimmer_1.5s_infinite]" style={{ backgroundSize: '200% 100%' }} />
            )}
          </div>

          {/* Node 2: Balsam AI Model (APPLE-ESQUE CODE FEEL) */}
          <div className={`w-[260px] bg-white rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] z-10 border transition-all duration-500 ${processing ? 'border-blue-300 ring-4 ring-blue-50' : 'border-gray-200'}`}>
            <div className="flex flex-col items-center justify-center text-center space-y-3">
              <div className={`p-3 rounded-2xl transition-all duration-500 ${processing ? 'bg-blue-50 shadow-inner' : 'bg-gray-50'}`}>
                <Sparkles className={`w-6 h-6 ${processing ? 'text-blue-500 animate-pulse' : 'text-gray-400'}`} />
              </div>
              <div>
                <h3 className="text-[13px] font-mono font-semibold text-gray-800 tracking-tight bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200/80 inline-block shadow-sm">
                  balsam_ai.model()
                </h3>
                <p className="text-[11px] font-medium text-gray-500 uppercase tracking-widest mt-2">
                  {processing ? 'Generating Image...' : 'Idle'}
                </p>
              </div>
            </div>
          </div>

          {/* Connector Line */}
          <div className="flex-1 h-[2px] bg-gradient-to-r from-gray-200 to-gray-200 relative">
             {processing && processing.progress! > 50 && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent w-full animate-[shimmer_1.5s_infinite]" style={{ backgroundSize: '200% 100%' }} />
            )}
          </div>

          {/* Node 3: Feedback Loop */}
          <div className="w-56 bg-white border border-gray-200/80 rounded-2xl p-4 shadow-sm z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-purple-50 rounded-md">
                <MessageSquare className="w-3.5 h-3.5 text-purple-600" />
              </div>
              <span className="text-[11px] font-semibold text-purple-600 uppercase tracking-widest">Feedback</span>
            </div>
            <p className="text-[12px] text-gray-600 leading-snug mb-3">
              Human-in-the-loop review ready. Connected to DAM syncing.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-medium text-gray-400 bg-gray-50 px-2 py-1.5 rounded-md border border-gray-100">
              <Database className="w-3 h-3" /> Acquia DAM
            </div>
          </div>

        </div>
      </main>

      {/* --- RIGHT PANEL: OUTPUT & REVIEW (ROW BY ROW) --- */}
      <aside className="relative z-10 w-[420px] bg-white/70 backdrop-blur-2xl border-l border-gray-200/60 flex flex-col shadow-[-4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="p-6 pb-4 border-b border-gray-200/60 flex justify-between items-center">
          <div>
            <h1 className="text-base font-semibold tracking-tight">Review Output</h1>
            <p className="text-[13px] text-gray-500 mt-0.5">{completed.length} items ready</p>
          </div>
          {completed.length > 0 && (
             <div className="px-2.5 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-[10px] font-bold tracking-widest uppercase flex items-center gap-1">
             <CheckCircle2 className="w-3 h-3" /> Syncing
           </div>
          )}
        </div>

        <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
          {completed.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 space-y-3 opacity-50">
              <ImageIcon className="w-8 h-8" />
              <p className="text-sm">No assets processed yet.<br/>Click Run Pipeline to begin.</p>
            </div>
          ) : (
            <div className="flex flex-col space-y-3">
              {completed.map((item) => (
                <div 
                  key={item.id} 
                  className="group flex items-center gap-4 p-3 bg-white border border-gray-200 rounded-2xl hover:border-blue-300 hover:shadow-md transition-all cursor-pointer animate-in fade-in slide-in-from-right-4"
                  onClick={() => setReviewingAsset(item)}
                >
                  {/* Thumbnail */}
                  <div className="h-16 w-16 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100 relative">
                    <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <Expand className="w-4 h-4 text-white opacity-0 group-hover:opacity-100" />
                    </div>
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-gray-900 truncate">{item.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded text-[10px] font-medium">Studio</span>
                      <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded text-[10px] font-medium">Isolated</span>
                    </div>
                  </div>

                  {/* Quick Action */}
                  <div className="pr-2">
                    <button className="w-8 h-8 flex items-center justify-center bg-gray-50 text-gray-400 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="p-6 border-t border-gray-200/60 bg-gray-50/50">
          <button 
            disabled={completed.length === 0}
            className="w-full py-2.5 bg-black disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-800 text-white rounded-xl text-[13px] font-medium transition-all shadow-md shadow-black/10 flex items-center justify-center gap-2"
          >
            Approve & Publish Batch
          </button>
        </div>
      </aside>

      {/* --- REVIEW MODAL (OVERLAY) --- */}
      {reviewingAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-white/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white border border-gray-200 shadow-2xl rounded-3xl overflow-hidden max-w-5xl w-full flex h-[80vh]">
            
            {/* Image Preview */}
            <div className="flex-1 bg-gray-50 relative flex items-center justify-center p-8">
              <button 
                onClick={() => setReviewingAsset(null)}
                className="absolute top-6 left-6 p-2 bg-white rounded-full shadow-sm hover:scale-105 transition-transform text-gray-500 z-10"
              >
                <X className="w-5 h-5" />
              </button>
              <img src={reviewingAsset.url} className="max-w-full max-h-full object-contain rounded-xl shadow-sm border border-gray-200/50" alt="Review" />
            </div>

            {/* Inspector Panel */}
            <div className="w-80 border-l border-gray-100 flex flex-col bg-white">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Asset Inspector</h2>
                <p className="text-xs text-gray-500 mt-1 truncate">{reviewingAsset.name}</p>
              </div>
              
              <div className="p-6 flex-1 space-y-6">
                <div>
                  <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest block mb-2">Generated Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {['Product', 'Studio Light', 'Minimal', 'High-Res'].map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-[11px] rounded-md">{tag}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest block mb-2">Feedback Prompt</label>
                  <textarea 
                    placeholder="E.g., Make the background slightly warmer..."
                    className="w-full h-24 p-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                  />
                  <button className="mt-2 w-full py-2 bg-gray-900 text-white rounded-lg text-xs font-medium hover:bg-black transition-colors">
                    Regenerate Frame
                  </button>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3">
                <button 
                  onClick={() => setReviewingAsset(null)}
                  className="flex-1 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-[13px] font-medium hover:bg-gray-50 transition-colors"
                >
                  Discard
                </button>
                <button 
                  onClick={() => setReviewingAsset(null)}
                  className="flex-1 py-2.5 bg-green-600 text-white rounded-xl text-[13px] font-medium hover:bg-green-700 transition-colors shadow-sm shadow-green-600/20"
                >
                  Approve Asset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global styles for the custom animation/scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}} />
    </div>
  );
}