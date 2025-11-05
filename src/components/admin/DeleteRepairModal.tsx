"use client";

import { useState, useEffect, useRef } from 'react';

interface DeleteRepairModalProps {
  repair: {
    type: string;
    quality: string;
    price: number;
  } | null;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  isOpen: boolean;
}

export default function DeleteRepairModal({ repair, onConfirm, onCancel, isOpen }: DeleteRepairModalProps) {
  const [confirmText, setConfirmText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setConfirmText('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onCancel();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleDelete = async () => {
    if (confirmText.toUpperCase() !== 'SLET') return;

    setDeleting(true);
    try {
      await onConfirm();
      onCancel();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Fejl ved sletning');
    } finally {
      setDeleting(false);
    }
  };

  if (!isOpen || !repair) return null;

  const canDelete = confirmText.toUpperCase() === 'SLET';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md" role="dialog" aria-modal="true">
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Slet reparation</h3>
              <p className="text-sm text-gray-500">Denne handling kan ikke fortrydes</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Du er ved at slette:</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-bold text-gray-900">{repair.type}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">{repair.quality}</span>
              <span className="text-gray-400">•</span>
              <span className="font-semibold text-gray-900">{repair.price} kr</span>
            </div>
          </div>

          <div>
            <label htmlFor="confirm-delete" className="block text-sm font-semibold text-gray-700 mb-2">
              Skriv <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-red-600">SLET</span> for at bekræfte
            </label>
            <input
              id="confirm-delete"
              ref={inputRef}
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && canDelete) {
                  handleDelete();
                }
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Skriv SLET"
              autoComplete="off"
            />
          </div>
        </div>

        <div className="px-6 py-5 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3 rounded-b-xl">
          <button
            onClick={onCancel}
            disabled={deleting}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition-colors disabled:opacity-50"
          >
            Annuller
          </button>
          <button
            onClick={handleDelete}
            disabled={!canDelete || deleting}
            className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {deleting ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Sletter...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Slet permanent</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
