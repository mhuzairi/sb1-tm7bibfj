import { Brain, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface Insight {
  id: number;
  title: string;
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
  category: string;
  action?: string;
}

const SAMPLE_INSIGHTS: Insight[] = [
  {
    id: 1,
    title: 'Revenue Growth Opportunity',
    description: 'Based on current trends, increasing your weekday lunch menu prices by 5% could generate an additional $1,200 monthly revenue with minimal impact on sales volume.',
    impact: 'positive',
    category: 'Pricing',
    action: 'Review and adjust lunch menu prices'
  },
  {
    id: 2,
    title: 'Inventory Alert',
    description: 'Coffee bean usage is 30% higher than usual. This may indicate waste in preparation or potential inventory shrinkage.',
    impact: 'negative',
    category: 'Inventory',
    action: 'Audit coffee preparation process'
  },
  {
    id: 3,
    title: 'Customer Behavior Pattern',
    description: 'Customers who order dessert are 45% more likely to return within 2 weeks. Consider training staff to suggest dessert pairings.',
    impact: 'positive',
    category: 'Customer Experience',
    action: 'Implement dessert recommendation training'
  },
  {
    id: 4,
    title: 'Staffing Optimization',
    description: 'Current staffing levels on Tuesday mornings exceed customer demand by 20%. Adjusting schedules could save $400 monthly.',
    impact: 'neutral',
    category: 'Operations',
    action: 'Review Tuesday morning staffing'
  }
];

export function InsightsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">AI Insights</h2>
        <p className="mt-1 text-sm text-gray-500">
          Actionable insights powered by artificial intelligence analysis of your business data.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SAMPLE_INSIGHTS.map(insight => (
          <div
            key={insight.id}
            className="bg-white rounded-lg shadow-sm p-6 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  insight.impact === 'positive' ? 'bg-green-100' :
                  insight.impact === 'negative' ? 'bg-red-100' :
                  'bg-gray-100'
                }`}>
                  {insight.impact === 'positive' ? (
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  ) : insight.impact === 'negative' ? (
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  ) : (
                    <Brain className="h-5 w-5 text-gray-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                  <p className="text-sm text-gray-500">{insight.category}</p>
                </div>
              </div>
              <span className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${
                insight.impact === 'positive' ? 'bg-green-100 text-green-800' :
                insight.impact === 'negative' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {insight.impact.charAt(0).toUpperCase() + insight.impact.slice(1)}
              </span>
            </div>

            <p className="text-gray-600">{insight.description}</p>

            {insight.action && (
              <div className="flex items-center pt-2">
                <CheckCircle className="h-5 w-5 text-indigo-600 mr-2" />
                <p className="text-sm font-medium text-indigo-600">
                  Recommended Action: {insight.action}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}