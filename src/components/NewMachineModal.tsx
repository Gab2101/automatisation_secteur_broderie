import React, { useState } from 'react';
import { X, Settings, MapPin, TrendingUp, Calendar, Package, AlertCircle, Save, Tag } from 'lucide-react';
import { ClothingType, DescriptionTag } from '../types';

interface NewMachineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMachine: (machineData: {
    name: string;
    type: string;
    location: string;
    efficiency: number;
    maintenanceDate: Date;
    capabilities: ClothingType[];
    descriptionTags?: DescriptionTag[];
  }) => void;
  clothingTypes: ClothingType[];
  allDescriptionTags: DescriptionTag[];
}

const machineTypes = [
  { value: 'sewing-basic', label: 'Couture Basique' },
  { value: 'sewing-advanced', label: 'Couture Avancée' },
  { value: 'sewing-heavy', label: 'Couture Lourde' },
  { value: 'pressing', label: 'Repassage' },
  { value: 'overlocking', label: 'Surfilage' },
  { value: 'riveting', label: 'Rivetage' },
  { value: 'buttonhole', label: 'Boutonnière' },
  { value: 'embroidery', label: 'Broderie' },
  { value: 'cutting', label: 'Découpe' }
];

const NewMachineModal: React.FC<NewMachineModalProps> = ({
  isOpen,
  onClose,
  onAddMachine,
  clothingTypes,
  allDescriptionTags
}) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    location: '',
    efficiency: 85,
    maintenanceDate: new Date().toISOString().split('T')[0]
  });
  const [selectedCapabilities, setSelectedCapabilities] = useState<ClothingType[]>([]);
  const [selectedTags, setSelectedTags] = useState<DescriptionTag[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const getTagColor = (color?: string) => {
    const colorMap: Record<string, string> = {
      blue: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200',
      red: 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200',
      green: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200',
      amber: 'bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200',
      gray: 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200',
      indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200 hover:bg-indigo-200',
      pink: 'bg-pink-100 text-pink-800 border-pink-200 hover:bg-pink-200',
      emerald: 'bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200',
      teal: 'bg-teal-100 text-teal-800 border-teal-200 hover:bg-teal-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200',
      violet: 'bg-violet-100 text-violet-800 border-violet-200 hover:bg-violet-200',
      rose: 'bg-rose-100 text-rose-800 border-rose-200 hover:bg-rose-200',
      cyan: 'bg-cyan-100 text-cyan-800 border-cyan-200 hover:bg-cyan-200',
      lime: 'bg-lime-100 text-lime-800 border-lime-200 hover:bg-lime-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200',
      sky: 'bg-sky-100 text-sky-800 border-sky-200 hover:bg-sky-200',
      fuchsia: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200 hover:bg-fuchsia-200',
      slate: 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200',
      zinc: 'bg-zinc-100 text-zinc-800 border-zinc-200 hover:bg-zinc-200',
      neutral: 'bg-neutral-100 text-neutral-800 border-neutral-200 hover:bg-neutral-200',
      stone: 'bg-stone-100 text-stone-800 border-stone-200 hover:bg-stone-200'
    };
    return colorMap[color || 'gray'] || 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200';
  };

  const getSelectedTagColor = (color?: string) => {
    const colorMap: Record<string, string> = {
      blue: 'bg-blue-500 text-white border-blue-500',
      red: 'bg-red-500 text-white border-red-500',
      green: 'bg-green-500 text-white border-green-500',
      purple: 'bg-purple-500 text-white border-purple-500',
      amber: 'bg-amber-500 text-white border-amber-500',
      gray: 'bg-gray-500 text-white border-gray-500',
      indigo: 'bg-indigo-500 text-white border-indigo-500',
      pink: 'bg-pink-500 text-white border-pink-500',
      emerald: 'bg-emerald-500 text-white border-emerald-500',
      teal: 'bg-teal-500 text-white border-teal-500',
      orange: 'bg-orange-500 text-white border-orange-500',
      violet: 'bg-violet-500 text-white border-violet-500',
      rose: 'bg-rose-500 text-white border-rose-500',
      cyan: 'bg-cyan-500 text-white border-cyan-500',
      lime: 'bg-lime-500 text-white border-lime-500',
      yellow: 'bg-yellow-500 text-white border-yellow-500',
      sky: 'bg-sky-500 text-white border-sky-500',
      fuchsia: 'bg-fuchsia-500 text-white border-fuchsia-500',
      slate: 'bg-slate-500 text-white border-slate-500',
      zinc: 'bg-zinc-500 text-white border-zinc-500',
      neutral: 'bg-neutral-500 text-white border-neutral-500',
      stone: 'bg-stone-500 text-white border-stone-500'
    };
    return colorMap[color || 'gray'] || 'bg-gray-500 text-white border-gray-500';
  };

  const toggleCapability = (clothingType: ClothingType) => {
    setSelectedCapabilities(prev => {
      const isSelected = prev.some(c => c.id === clothingType.id);
      if (isSelected) {
        return prev.filter(c => c.id !== clothingType.id);
      } else {
        return [...prev, clothingType];
      }
    });
  };

  const toggleTag = (tag: DescriptionTag) => {
    setSelectedTags(prev => {
      const isSelected = prev.some(t => t.id === tag.id);
      if (isSelected) {
        return prev.filter(t => t.id !== tag.id);
      } else {
        return [...prev, tag];
      }
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom de la machine est requis';
    }

    if (!formData.type) {
      newErrors.type = 'Le type de machine est requis';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'La localisation est requise';
    }

    if (formData.efficiency < 1 || formData.efficiency > 100) {
      newErrors.efficiency = 'L\'efficacité doit être entre 1 et 100%';
    }

    if (!formData.maintenanceDate) {
      newErrors.maintenanceDate = 'La date de maintenance est requise';
    }

    if (selectedCapabilities.length === 0) {
      newErrors.capabilities = 'Au moins une capacité doit être sélectionnée';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onAddMachine({
      name: formData.name,
      type: formData.type,
      location: formData.location,
      efficiency: formData.efficiency,
      maintenanceDate: new Date(formData.maintenanceDate),
      capabilities: selectedCapabilities,
      descriptionTags: selectedTags
    });

    // Reset form
    setFormData({
      name: '',
      type: '',
      location: '',
      efficiency: 85,
      maintenanceDate: new Date().toISOString().split('T')[0]
    });
    setSelectedCapabilities([]);
    setSelectedTags([]);
    setErrors({});
    onClose();
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Nouvelle Machine</h2>
            <p className="text-sm text-gray-600 mt-1">
              Ajouter une nouvelle machine de production
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Informations de base */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Informations de base</h3>

              {/* Nom de la machine */}
              <div>
                <label htmlFor="machineName" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de la machine *
                </label>
                <div className="relative">
                  <Settings className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    id="machineName"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                      errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Ex: Singer Pro 9000"
                  />
                </div>
                {errors.name && (
                  <div className="flex items-center mt-1 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.name}
                  </div>
                )}
              </div>

              {/* Type de machine */}
              <div>
                <label htmlFor="machineType" className="block text-sm font-medium text-gray-700 mb-2">
                  Type de machine *
                </label>
                <select
                  id="machineType"
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                    errors.type ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  <option value="">Sélectionner un type</option>
                  {machineTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.type && (
                  <div className="flex items-center mt-1 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.type}
                  </div>
                )}
              </div>

              {/* Localisation */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Localisation *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                      errors.location ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Ex: Zone A"
                  />
                </div>
                {errors.location && (
                  <div className="flex items-center mt-1 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.location}
                  </div>
                )}
              </div>

              {/* Efficacité */}
              <div>
                <label htmlFor="efficiency" className="block text-sm font-medium text-gray-700 mb-2">
                  Efficacité (%) *
                </label>
                <div className="relative">
                  <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    id="efficiency"
                    min="1"
                    max="100"
                    value={formData.efficiency}
                    onChange={(e) => handleInputChange('efficiency', parseInt(e.target.value) || 0)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                      errors.efficiency ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="85"
                  />
                </div>
                {errors.efficiency && (
                  <div className="flex items-center mt-1 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.efficiency}
                  </div>
                )}
              </div>

              {/* Date de maintenance */}
              <div>
                <label htmlFor="maintenanceDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Dernière maintenance *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="date"
                    id="maintenanceDate"
                    value={formData.maintenanceDate}
                    onChange={(e) => handleInputChange('maintenanceDate', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                      errors.maintenanceDate ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.maintenanceDate && (
                  <div className="flex items-center mt-1 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.maintenanceDate}
                  </div>
                )}
              </div>
            </div>

            {/* Capacités et vignettes */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Capacités et description</h3>

              {/* Capacités */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <Package className="inline w-4 h-4 mr-2" />
                  Capacités de production *
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3">
                  {clothingTypes.map((clothingType) => {
                    const isSelected = selectedCapabilities.some(c => c.id === clothingType.id);
                    return (
                      <label
                        key={clothingType.id}
                        className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleCapability(clothingType)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{clothingType.name}</div>
                          <div className="text-xs text-gray-500">
                            Complexité: {clothingType.complexity} • {clothingType.estimatedTime}min/unité
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
                {errors.capabilities && (
                  <div className="flex items-center mt-1 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.capabilities}
                  </div>
                )}
              </div>

              {/* Vignettes de description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <Tag className="inline w-4 h-4 mr-2" />
                  Vignettes de description
                </label>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {allDescriptionTags.map((tag) => {
                      const isSelected = selectedTags.some(t => t.id === tag.id);
                      return (
                        <button
                          key={tag.id}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
                            isSelected 
                              ? getSelectedTagColor(tag.color)
                              : getTagColor(tag.color)
                          }`}
                          title={`${tag.label} (${tag.code})`}
                        >
                          {tag.label}
                        </button>
                      );
                    })}
                  </div>

                  {selectedTags.length > 0 && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-600 mb-2">Vignettes sélectionnées :</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedTags.map((tag) => (
                          <span
                            key={tag.id}
                            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {tag.label} ({tag.code})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Ajouter la machine</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewMachineModal;