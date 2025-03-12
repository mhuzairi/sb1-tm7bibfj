import { useState } from 'react';
import {
  Settings as SettingsIcon,
  Bell,
  Brain,
  Shield,
  Languages,
  Sliders,
  Save,
  RefreshCw,
} from 'lucide-react';
import { Button } from '../../components/ui/button';

interface AIModel {
  id: string;
  name: string;
  description: string;
  parameters: AIParameter[];
}

interface AIParameter {
  id: string;
  name: string;
  description: string;
  type: 'slider' | 'toggle' | 'select';
  value: number | boolean | string;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
}

const DEFAULT_AI_MODELS: AIModel[] = [
  {
    id: 'financial-forecasting',
    name: 'Financial Forecasting',
    description: 'AI model for predicting revenue, expenses, and cash flow',
    parameters: [
      {
        id: 'confidence-threshold',
        name: 'Confidence Threshold',
        description: 'Minimum confidence level for predictions',
        type: 'slider',
        value: 0.8,
        min: 0.5,
        max: 0.95,
        step: 0.05
      },
      {
        id: 'forecast-horizon',
        name: 'Forecast Horizon',
        description: 'How far into the future to predict',
        type: 'select',
        value: '3-months',
        options: ['1-month', '3-months', '6-months', '1-year']
      }
    ]
  },
  {
    id: 'inventory-optimization',
    name: 'Inventory Optimization',
    description: 'AI-powered inventory management and ordering suggestions',
    parameters: [
      {
        id: 'reorder-sensitivity',
        name: 'Reorder Sensitivity',
        description: 'How quickly to suggest reordering low stock items',
        type: 'slider',
        value: 0.7,
        min: 0.3,
        max: 0.9,
        step: 0.1
      },
      {
        id: 'seasonal-adjustment',
        name: 'Seasonal Adjustment',
        description: 'Account for seasonal variations in demand',
        type: 'toggle',
        value: true
      }
    ]
  },
  {
    id: 'customer-insights',
    name: 'Customer Insights',
    description: 'AI analysis of customer behavior and preferences',
    parameters: [
      {
        id: 'analysis-depth',
        name: 'Analysis Depth',
        description: 'How detailed the customer analysis should be',
        type: 'select',
        value: 'balanced',
        options: ['basic', 'balanced', 'deep', 'comprehensive']
      },
      {
        id: 'privacy-level',
        name: 'Privacy Level',
        description: 'Level of data anonymization',
        type: 'select',
        value: 'high',
        options: ['standard', 'high', 'maximum']
      }
    ]
  }
];

export function SettingsPage() {
  const [aiModels, setAiModels] = useState<AIModel[]>(DEFAULT_AI_MODELS);
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: false,
    dailyReports: true,
    aiInsights: true
  });
  const [language, setLanguage] = useState('english');
  const [theme, setTheme] = useState('light');

  const handleParameterChange = (modelId: string, paramId: string, newValue: number | boolean | string) => {
    setAiModels(currentModels =>
      currentModels.map(model =>
        model.id === modelId
          ? {
              ...model,
              parameters: model.parameters.map(param =>
                param.id === paramId
                  ? { ...param, value: newValue }
                  : param
              )
            }
          : model
      )
    );
  };

  const handleSave = () => {
    // TODO: Save settings to backend
    console.log('Saving settings:', { aiModels, notifications, language, theme });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Customize your experience and AI parameters
        </p>
      </div>

      {/* AI Models Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-4">
          <Brain className="h-5 w-5 text-indigo-600 mr-2" />
          <h3 className="text-lg font-semibold">AI Models & Parameters</h3>
        </div>
        
        <div className="space-y-6">
          {aiModels.map(model => (
            <div key={model.id} className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-900">{model.name}</h4>
              <p className="text-sm text-gray-500 mb-4">{model.description}</p>
              
              <div className="space-y-4">
                {model.parameters.map(param => (
                  <div key={param.id} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {param.name}
                      <span className="block text-xs text-gray-500">
                        {param.description}
                      </span>
                    </label>

                    {param.type === 'slider' && (
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min={param.min}
                          max={param.max}
                          step={param.step}
                          value={param.value as number}
                          onChange={(e) => handleParameterChange(
                            model.id,
                            param.id,
                            parseFloat(e.target.value)
                          )}
                          className="w-full"
                        />
                        <span className="text-sm text-gray-600">
                          {(param.value as number).toFixed(2)}
                        </span>
                      </div>
                    )}

                    {param.type === 'toggle' && (
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={param.value as boolean}
                          onChange={(e) => handleParameterChange(
                            model.id,
                            param.id,
                            e.target.checked
                          )}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-sm text-gray-600">
                          {(param.value as boolean) ? 'Enabled' : 'Disabled'}
                        </span>
                      </label>
                    )}

                    {param.type === 'select' && (
                      <select
                        value={param.value as string}
                        onChange={(e) => handleParameterChange(
                          model.id,
                          param.id,
                          e.target.value
                        )}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        {param.options?.map(option => (
                          <option key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-4">
          <Bell className="h-5 w-5 text-indigo-600 mr-2" />
          <h3 className="text-lg font-semibold">Notifications</h3>
        </div>
        
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={notifications.emailAlerts}
              onChange={(e) => setNotifications(prev => ({
                ...prev,
                emailAlerts: e.target.checked
              }))}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Email Alerts</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={notifications.pushNotifications}
              onChange={(e) => setNotifications(prev => ({
                ...prev,
                pushNotifications: e.target.checked
              }))}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Push Notifications</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={notifications.dailyReports}
              onChange={(e) => setNotifications(prev => ({
                ...prev,
                dailyReports: e.target.checked
              }))}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Daily Reports</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={notifications.aiInsights}
              onChange={(e) => setNotifications(prev => ({
                ...prev,
                aiInsights: e.target.checked
              }))}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>AI Insights</span>
          </label>
        </div>
      </div>

      {/* General Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-4">
          <Sliders className="h-5 w-5 text-indigo-600 mr-2" />
          <h3 className="text-lg font-semibold">General Settings</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="german">German</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Theme
            </label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={() => window.location.reload()}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset to Defaults
        </Button>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}