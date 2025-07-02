import React, { useState } from 'react';
import ApperIcon from '@/components/ApperIcon';

const PhotoProgress = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  if (!photos || photos.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="Camera" size={24} className="text-gray-400" />
        </div>
        <p className="text-gray-600 mb-4">No progress photos yet</p>
        <button className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all">
          Add First Photo
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Photo Grid */}
      <div className="grid grid-cols-3 gap-3">
        {photos.map((photo) => (
          <div
            key={photo.Id}
            onClick={() => setSelectedPhoto(photo)}
            className="aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img
              src={photo.url}
              alt={`Progress ${photo.date}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        
        {/* Add Photo Button */}
        <button className="aspect-square bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex flex-col items-center justify-center hover:from-primary-200 hover:to-secondary-200 transition-colors">
          <ApperIcon name="Plus" size={24} className="text-primary-600 mb-1" />
          <span className="text-xs text-primary-600 font-medium">Add Photo</span>
        </button>
      </div>

      {/* Photo Timeline */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">Photo Timeline</h3>
        <div className="space-y-2">
          {photos.slice(0, 3).map((photo) => (
            <div key={photo.Id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={photo.url}
                  alt={`Progress ${photo.date}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{photo.date}</p>
                <p className="text-sm text-gray-600">{photo.weight}kg</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">{photo.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="max-w-md w-full bg-white rounded-2xl p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Progress Photo</h3>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <ApperIcon name="X" size={20} />
              </button>
            </div>
            
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4">
              <img
                src={selectedPhoto.url}
                alt={`Progress ${selectedPhoto.date}`}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{selectedPhoto.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Weight:</span>
                <span className="font-medium">{selectedPhoto.weight}kg</span>
              </div>
              {selectedPhoto.note && (
                <div>
                  <span className="text-gray-600">Note:</span>
                  <p className="text-gray-900 mt-1">{selectedPhoto.note}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoProgress;