import React from 'react';
import { Operator } from '../types';
import { User, Globe, Tag, Star, Settings } from 'lucide-react';

interface OperatorCardProps {
  operator: Operator;
  onClick?: () => void;
  onEdit?: () => void;
}

const OperatorCard: React.FC<OperatorCardProps> = ({ operator, onClick, onEdit }) => {
  const getTagColor = (color?: string) => {
    const colorMap: Record<string, string> = {
      blue: 'bg-blue-100 text-blue-800',
      red: 'bg-red-100 text-red-800',
      green: 'bg-green-100 text-green-800',
      purple: 'bg-purple-100 text-purple-800',
      amber: 'bg-amber-100 text-amber-800',
      gray: 'bg-gray-100 text-gray-800',
      indigo: 'bg-indigo-100 text-indigo-800',
      pink: 'bg-pink-100 text-pink-800',
      emerald: 'bg-emerald-100 text-emerald-800',
      teal: 'bg-teal-100 text-teal-800',
      orange: 'bg-orange-100 text-orange-800',
      violet: 'bg-violet-100 text-violet-800',
      rose: 'bg-rose-100 text-rose-800',
      cyan: 'bg-cyan-100 text-cyan-800',
      lime: 'bg-lime-100 text-lime-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      sky: 'bg-sky-100 text-sky-800',
      fuchsia: 'bg-fuchsia-100 text-fuchsia-800',
      slate: 'bg-slate-100 text-slate-800',
      zinc: 'bg-zinc-100 text-zinc-800',
      neutral: 'bg-neutral-100 text-neutral-800',
      stone: 'bg-stone-100 text-stone-800'
    };
    return colorMap[color || 'gray'] || 'bg-gray-100 text-gray-800';
  };

  const getLanguageName = (code: string) => {
    const languages: Record<string, string> = {
      fr: 'Français',
      en: 'English',
      es: 'Español',
      de: 'Deutsch',
      it: 'Italiano',
      pt: 'Português',
      ar: 'العربية',
      zh: '中文',
      ja: '日本語',
      ko: '한국어',
      ru: 'Русский',
      hi: 'हिन्दी'
    };
    return languages[code] || code;
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.();
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{operator.name}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Globe className="w-4 h-4" />
              <span>{getLanguageName(operator.language)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-amber-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium text-gray-700">Expert</span>
          </div>
          <button
            onClick={handleEditClick}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            title="Modifier l'opérateur"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Points forts */}
      {operator.strengths && operator.strengths.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Tag className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Points forts</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {operator.strengths.slice(0, 4).map((strength) => (
              <span
                key={strength.id}
                className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getTagColor(strength.color)}`}
                title={`${strength.label} (${strength.code})`}
              >
                {strength.label}
              </span>
            ))}
            {operator.strengths.length > 4 && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
                +{operator.strengths.length - 4} autres
              </span>
            )}
          </div>
        </div>
      )}

      {operator.strengths.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          <Tag className="w-8 h-8 mx-auto mb-2 text-gray-300" />
          <p className="text-sm">Aucune spécialité définie</p>
        </div>
      )}
    </div>
  );
};

export default OperatorCard;