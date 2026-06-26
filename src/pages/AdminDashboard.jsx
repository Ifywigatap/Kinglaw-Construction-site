import { Link, useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useManagedData from "../hooks/useManagedData";
import { adminGalleryKey, initialAdminGalleryImages } from "../data/adminGallery";
import { materials, rentals, lands, designs, artifacts, buildingPlans } from "../data/catalog";
import { useAuth } from "../auth/AuthContext";
import Button from "../components/common/Button";
import ConfirmationModal from "../components/common/ConfirmationModal";
import OptimizedImage from "../components/common/OptimizedImage";


/**
 * Reads a file and converts it to a Data URL.
 * @param {File} file The file to read.
 * @returns {Promise<string>} A promise that resolves with the data URL.
 */
const readFileAsDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const managementTabs = [
  { id: 'gallery', label: 'Gallery', initialData: initialAdminGalleryImages, fields: [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'category', label: 'Category', type: 'select', options: ['construction', 'design', 'completed'] },
    { name: 'alt', label: 'Alt Text', type: 'text' },
    { name: 'src', label: 'Image', type: 'image', required: true },
  ]},
  { id: 'materials', label: 'Materials', initialData: materials, fields: [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'price', label: 'Price', type: 'text' },
    { name: 'type', label: 'Type', type: 'text' },
    { name: 'image', label: 'Image URL', type: 'text', required: true },
  ]},
  { id: 'rentals', label: 'Rentals', initialData: rentals, fields: [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'price', label: 'Price', type: 'text' },
    { name: 'location', label: 'Location', type: 'text' },
    { name: 'features', label: 'Features (comma-separated)', type: 'text' },
    { name: 'image', label: 'Image URL', type: 'text', required: true },
  ]},
  { id: 'lands', label: 'Lands', initialData: lands, fields: [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'price', label: 'Price', type: 'text' },
    { name: 'size', label: 'Size', type: 'text' },
    { name: 'location', label: 'Location', type: 'text' },
    { name: 'image', label: 'Image URL', type: 'text', required: true },
  ]},
  { id: 'designs', label: 'Designs', initialData: designs, fields: [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'type', label: 'Type', type: 'text' },
    { name: 'delivery', label: 'Delivery', type: 'text' },
    { name: 'image', label: 'Image URL', type: 'text', required: true },
  ]},
  { id: 'artifacts', label: 'Artifacts', initialData: artifacts, fields: [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'origin', label: 'Origin', type: 'text' },
    { name: 'image', label: 'Image URL', type: 'text', required: true },
  ]},
  { id: 'buildingPlans', label: 'Building Plans', initialData: buildingPlans, fields: [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'area', label: 'Area', type: 'text' },
    { name: 'price', label: 'Price', type: 'text' },
    { name: 'image', label: 'Image URL', type: 'text', required: true },
  ]},
];

/**
 * A generic form for adding or editing a catalog item.
 */
function ItemForm({ fields, onSave, initialData = {}, isEditing = false }) {
  const [formData, setFormData] = useState(() => {
    const defaultState = {};
    fields.forEach(field => {
      defaultState[field.name] = initialData[field.name] || (field.name === 'features' ? [] : '');
    });
    return defaultState;
  });
  const [errors, setErrors] = useState({});

  const handleFieldChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const preview = await readFileAsDataUrl(file);
    // 'src' is used for gallery, 'image' for others. Find which one is in fields.
    const imageField = fields.find(f => f.type === 'image')?.name || 'src';
    setFormData((prev) => ({ ...prev, [imageField]: preview }));
  };

  const validateForm = () => {
    const newErrors = {};
    fields.forEach(field => {
      if (field.required && !String(formData[field.name]).trim()) {
        newErrors[field.name] = `${field.label} is required.`;
      }
    });
    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // Convert comma-separated features to array
      const dataToSave = { ...formData };
      if (dataToSave.features && typeof dataToSave.features === 'string') {
        dataToSave.features = dataToSave.features.split(',').map(s => s.trim()).filter(Boolean);
      }
      onSave(dataToSave);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map(field => (
        <div key={field.name} className="space-y-2">
          <label className="block text-sm font-medium text-card-foreground">{field.label}</label>
          {field.type === 'textarea' ? (
            <textarea value={formData[field.name]} onChange={(e) => handleFieldChange(field.name, e.target.value)} className="w-full rounded-2xl border border-input bg-secondary px-4 py-3 text-foreground transition-colors resize-none" rows={4} placeholder={field.label} />
          ) : field.type === 'select' ? (
            <select value={formData[field.name]} onChange={(e) => handleFieldChange(field.name, e.target.value)} className="w-full rounded-2xl border border-input bg-secondary px-4 py-3 text-foreground transition-colors">
              {field.options.map(opt => <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>)}
            </select>
          ) : field.type === 'image' ? (
            <input type="file" accept="image/*" onChange={handleFileChange} className="w-full rounded-2xl border border-input bg-secondary px-4 py-3 text-foreground transition-colors" />
          ) : (
            <input type={field.type} value={Array.isArray(formData[field.name]) ? formData[field.name].join(', ') : formData[field.name]} onChange={(e) => handleFieldChange(field.name, e.target.value)} className="w-full rounded-2xl border border-input bg-secondary px-4 py-3 text-foreground transition-colors" placeholder={field.label} />
          )}
          <AnimatePresence>
            {errors[field.name] && (
              <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-sm text-red-500 mt-1">{errors[field.name]}</motion.p>
            )}
          </AnimatePresence>
        </div>
      ))}
      
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" variant="primary" className="w-full sm:w-auto">{isEditing ? 'Save Changes' : 'Add Item'}</Button>
      </div>
    </form>
  );
}

/**
 * A card component to display and edit a single image.
 */
function ItemCard({ item, fields, onUpdate, onDeleteRequest }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleStartEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleCancelEdit = useCallback(() => setIsEditing(false), []);

  const handleSaveEdit = useCallback((updatedData) => {
    onUpdate(item.id, updatedData);
    setIsEditing(false);
  }, [item.id, onUpdate]);

  const imageSrc = item.src || item.image;

  return (
    <motion.article layout variants={itemVariants} className="rounded-3xl border border-border bg-card shadow-xl overflow-hidden transition-colors duration-300">
      <div className="h-72 overflow-hidden bg-secondary transition-colors">
        <OptimizedImage src={imageSrc} alt={item.alt || item.title} className="h-full w-full object-cover" />
      </div>
      <div className="p-6">
        {isEditing ? (
          <>
            <ItemForm fields={fields} onSave={handleSaveEdit} initialData={item} isEditing={true} />
            <Button onClick={handleCancelEdit} variant="secondary" className="w-full mt-3">Cancel</Button>
          </>
        ) : (
          <>
            <h3 className="text-xl font-bold mb-2 truncate">{item.title}</h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2 h-10">{item.description}</p>
            {/* Display a few key details */}
            <div className="text-xs text-muted-foreground/80 space-y-1 mb-4">
              {item.price && <div><strong>Price:</strong> {item.price}</div>}
              {item.size && <div><strong>Size:</strong> {item.size}</div>}
              {item.location && <div><strong>Location:</strong> {item.location}</div>}
              {item.type && <div><strong>Type:</strong> {item.type}</div>}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleStartEdit} variant="outline" size="sm">Edit</Button>
              <Button onClick={() => onDeleteRequest(item.id)} variant="destructive" size="sm">Delete</Button>
            </div>
          </>
        )}
      </div>
    </motion.article>
  );
}

function ManagementSection({ categoryInfo }) {
  const { id, label, initialData, fields } = categoryInfo;
  const { data: items, setData: setItems } = useManagedData(id, initialData);
  const [deleteId, setDeleteId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddItem = useCallback((newItemData) => {
    const newItem = {
      id: `${id}-${Date.now()}`,
      ...newItemData,
    };
    setItems(prevItems => [newItem, ...prevItems]);
    setIsAdding(false);
  }, [setItems, id]);

  const handleUpdateItem = useCallback((itemId, updatedData) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, ...updatedData } : item
      )
    );
  }, [setItems]);

  const handleDeleteRequest = useCallback((id) => {
    setDeleteId(id);
  }, []);

  const handleConfirmDelete = () => {
    if (deleteId) {
      setItems(prevItems => prevItems.filter(item => item.id !== deleteId));
      setDeleteId(null);
    }
  };

  const handleCloseDeleteModal = useCallback(() => {
    setDeleteId(null);
  }, []);

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Manage {label}</h2>
        <Button onClick={() => setIsAdding(!isAdding)} variant={isAdding ? "secondary" : "primary"}>
          {isAdding ? 'Cancel' : `Add New ${label.slice(0, -1)}`}
        </Button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className="rounded-3xl border border-border bg-card p-8 shadow-xl">
              <h3 className="text-xl font-semibold mb-6">New Item Details</h3>
              <ItemForm fields={fields} onSave={handleAddItem} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
      >
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            fields={fields}
            onUpdate={handleUpdateItem}
            onDeleteRequest={handleDeleteRequest}
          />
        ))}
      </motion.div>

      <ConfirmationModal
        isOpen={deleteId !== null}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title={`Delete ${label.slice(0, -1)}`}
        message="Are you sure you want to delete this item? This will permanently remove it from your local showcase."
        confirmText="Yes, Delete"
      />
    </div>
  );
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState(managementTabs[0].id);
  const activeCategoryInfo = managementTabs.find(tab => tab.id === activeTab);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <main className="py-24 bg-background text-foreground transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="mb-16 rounded-3xl border border-border bg-card p-10 shadow-xl transition-colors duration-300">
          <div className="flex justify-between items-start flex-wrap gap-y-2 mb-4">
            <p className="text-primary uppercase tracking-[0.3em] font-semibold">Admin Dashboard</p>
            {user && <p className="text-sm text-muted-foreground">Welcome, <span className="font-semibold text-foreground">{user.name}</span></p>}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 transition-colors">Local Content Management</h1>
          <p className="text-muted-foreground max-w-3xl transition-colors">
            Add, update, and remove items from your website's catalogs. Changes are saved to your browser's local storage and will be visible to you on the live site.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/admin/gallery">
              <Button variant="outline">
                Preview Local Gallery
              </Button>
            </Link>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-12 flex flex-wrap justify-center gap-3 border-b border-border pb-4">
          {managementTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-5 py-2 font-medium transition ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "border border-transparent text-muted-foreground hover:bg-secondary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeCategoryInfo && <ManagementSection key={activeTab} categoryInfo={activeCategoryInfo} />}
      </div>
    </main>
  );
}
