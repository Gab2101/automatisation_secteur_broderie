import React, { useState, useEffect } from 'react';
import { X, Plus, Edit2, Trash2, Palette, Save, AlertCircle } from 'lucide-react';
import { DescriptionTag } from '../types';
import { descriptionTags as initialDescriptionTags } from '../data/mockData';

interface TagManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  customTags: DescriptionTag[];
  onSave: (tags: DescriptionTag[]) => void;
}

const availableColors = [
  { name: 'red', label: 'Rouge' },
  { name: 'blue', label: 'Bleu' },
  { name: 'green', label: 'Vert' },
  { name: 'purple', label: 'Violet' },
  { name: 'amber', label: 'Ambre' },
  { name: 'emerald', label: 'Émeraude' },
  { name: 'teal', label: 'Sarcelle' },
  { name: 'orange', label: 'Orange' },
  { name: 'violet', label: 'Violet foncé' },
  { name: 'rose', label: 'Rose' },
  { name: 'cyan', label: 'Cyan' },
  { name: 'lime', label: 'Citron vert' },
  { name: 'yellow', label: 'Jaune' },
  { name: 'sky', label: 'Bleu ciel' },
  { name: 'fuchsia', label: 'Fuchsia' },
  { name: 'pink', label: 'Rose vif' },
  { name: 'indigo', label: 'Indigo' },
  { name: 'slate', label: 'Ardoise' },
  { name: 'zinc', label: 'Zinc' },
  { name: 'neutral', label: 'Neutre' },
  { name: 'stone', label: 'Pierre' },
  { name: 'gray', label: 'Gris' }
];

const TagManagementModal: React.FC<TagManagementModalProps> = ({
  isOpen,
  onClose,
  customTags,
  onSave
}) => {
  const [localCustomTags, setLocalCustomTags] = useState<DescriptionTag[]>(customTags);
  const [editingTag, setEditingTag] = useState<DescriptionTag | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    label: '',
    color: 'blue'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setLocalCustomTags(customTags);
  }, [customTags]);

  if (!isOpen) return null;

  const getTagColorClasses = (color: string) => {
    return {
      bg: `bg-${color}-100`,
      text: `text-${color}-800`,
      border: `border-${color}-200`,
      hover: `hover:bg-${color}-200`
    };
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.code.trim()) {
      newErrors.code = 'Le code est requis';
    } else if (formData.code.length > 4) {
      newErrors.code = 'Le code ne peut pas dépasser 4 caractères';
    }

    if (!formData.label.trim()) {
      newErrors.label = 'Le libellé est requis';
    }

    // Check for duplicate codes
    const allTags = [...initialDescriptionTags, ...localCustomTags];
    const existingTag = allTags.find(tag => 
      tag.code.toLowerCase() === formData.code.toLowerCase() && 
      tag.id !== editingTag?.id
    );
    
    if (existingTag) {
      newErrors.code = 'Ce code existe déjà';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    if (editingTag) {
      // Update existing tag
      const updatedTags = localCustomTags.map(tag =>
        tag.id === editingTag.id
          ? { ...tag, code: formData.code.toUpperCase(), label: formData.label, color: formData.color }
          : tag
      );
      setLocalCustomTags(updatedTags);
    } else {
      // Create new tag
      const newTag: DescriptionTag = {
        id: `custom-${Date.now()}`,
        code: formData.code.toUpperCase(),
        label: formData.label,
        color: formData.color
      };
      setLocalCustomTags(prev => [...prev, newTag]);
    }

    resetForm();
  };

  const handleEdit = (tag: DescriptionTag) => {
    setEditingTag(tag);
    setFormData({
      code: tag.code,
      label: tag.label,
      color: tag.color || 'blue'
    });
    setIsCreating(true);
    setErrors({});
  };

  const handleDelete = (tagId: string) => {
    setLocalCustomTags(prev => prev.filter(tag => tag.id !== tagId));
  };

  const resetForm = () => {
    setFormData({ code: '', label: '', color: 'blue' });
    setEditingTag(null);
    setIsCreating(false);
    setErrors({});
  };

  const handleSaveAll = () => {
    onSave(localCustomTags);
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
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
            <h2 className="text-xl font-semibold text-gray-900">Paramètres des Vignettes</h2>
            <p className="text-sm text-gray-600 mt-1">
              Gérer les vignettes de description des articles
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tags List */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Vignettes Disponibles</h3>
                <button
                  onClick={() => setIsCreating(true)}
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nouvelle</span>
                </button>
              </div>

              <div className="space-y-4">
                {/* Initial Tags (Read-only) */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Vignettes par défaut</h4>
                  <div className="space-y-2">
                    {initialDescriptionTags.map((tag) => (
                      <div
                        key={tag.id}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50"
                      >
                        <div className="flex items-center space-x-3">
                          <span
                            className={`px-3 py-1 rounded-lg text-sm font-medium bg-${tag.color}-100 text-${tag.color}-800 border border-${tag.color}-200`}
                          >
                            {tag.label}
                          </span>
                          <span className="text-xs text-gray-500">({tag.code})</span>
                        </div>
                        <span className="text-xs text-gray-400">Par défaut</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Custom Tags */}
                {localCustomTags.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Vignettes personnalisées</h4>
                    <div className="space-y-2">
                      {localCustomTags.map((tag) => (
                        <div
                          key={tag.id}
                          className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <span
                              className={`px-3 py-1 rounded-lg text-sm font-medium bg-${tag.color}-100 text-${tag.color}-800 border border-${tag.color}-200`}
                            >
                              {tag.label}
                            </span>
                            <span className="text-xs text-gray-500">({tag.code})</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEdit(tag)}
                              className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors duration-200"
                              title="Modifier"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(tag.id)}
                              className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors duration-200"
                              title="Supprimer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Form */}
            {isCreating && (
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <h3 className="text-lg font-medium text-blue-900 mb-4">
                  {editingTag ? 'Modifier la vignette' : 'Nouvelle vignette'}
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-2">
                      Code (max 4 caractères) *
                    </label>
                    <input
                      type="text"
                      value={formData.code}
                      onChange={(e) => handleInputChange('code', e.target.value.toUpperCase())}
                      className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                        errors.code ? 'border-red-300 bg-red-50' : 'border-blue-300'
                      }`}
                      placeholder="Ex: GB"
                      maxLength={4}
                    />
                    {errors.code && (
                      <div className="flex items-center mt-1 text-sm text-red-600">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.code}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-2">
                      Description *
                    </label>
                    <input
                      type="text"
                      value={formData.label}
                      onChange={(e) => handleInputChange('label', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                        errors.label ? 'border-red-300 bg-red-50' : 'border-blue-300'
                      }`}
                      placeholder="Ex: Grande Broderie"
                    />
                    {errors.label && (
                      <div className="flex items-center mt-1 text-sm text-red-600">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.label}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-2">
                      <Palette className="inline w-4 h-4 mr-1" />
                      Couleur
                    </label>
                    <select
                      value={formData.color}
                      onChange={(e) => handleInputChange('color', e.target.value)}
                      className="w-full px-3 py-2 border border-blue-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    >
                      {availableColors.map((color) => (
                        <option key={color.name} value={color.name}>
                          {color.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Preview */}
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-2">Aperçu</label>
                    <div className="p-3 bg-white rounded-lg border border-blue-200">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-${formData.color}-100 text-${formData.color}-800 border border-${formData.color}-200`}
                      >
                        {formData.label || 'Description'} ({formData.code || 'CODE'})
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={handleSave}
                      disabled={!formData.code.trim() || !formData.label.trim()}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      <Save className="w-4 h-4" />
                      <span>{editingTag ? 'Modifier' : 'Ajouter'}</span>
                    </button>
                    <button
                      onClick={resetForm}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Annuler
          </button>
          <button
            onClick={handleSaveAll}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Enregistrer les modifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default TagManagementModal;