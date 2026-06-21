import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ResumeUploader({ onUpload, isUploading }) {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles[0]);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    disabled: isUploading
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300
          ${isDragActive ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10' : 'border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'}
          ${isDragReject ? 'border-red-500 bg-red-50 dark:bg-red-500/10' : ''}
          ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center justify-center space-y-4">
          <motion.div
            animate={{ y: isDragActive ? -10 : 0 }}
            className={`w-16 h-16 rounded-full flex items-center justify-center ${
              isDragActive ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
            }`}
          >
            {isUploading ? (
              <svg className="animate-spin h-8 w-8" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : isDragReject ? (
              <AlertCircle className="w-8 h-8 text-red-500" />
            ) : (
              <UploadCloud className="w-8 h-8" />
            )}
          </motion.div>

          <div>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">
              {isUploading ? 'Analyzing Resume...' : isDragActive ? 'Drop resume here' : 'Drag & drop your resume'}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Supports PDF and DOCX (Max 5MB)
            </p>
          </div>

          {!isUploading && (
            <div className="mt-4 px-6 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm pointer-events-none">
              Or click to browse files
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
