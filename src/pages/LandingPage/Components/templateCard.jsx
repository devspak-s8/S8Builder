import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, CheckCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { useState } from "react";

export function TemplateCard({ template, index = 0 }) {
  return (
    <Card
      className="group overflow-hidden border-2 hover:border-purple-200 transition-all duration-500 hover:shadow-lg card-3d fade-up"
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="relative overflow-hidden">
        <img
          src={template.image || "/placeholder.svg"}
          alt={template.name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
            <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
              <Eye className="h-4 w-4 mr-1" />
              Preview
            </Button>
            <Link to="/booking">
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                <Download className="h-4 w-4 mr-1" />
                Get
              </Button>
            </Link>
          </div>
        </div>
        <Badge className="absolute top-2 right-2 bg-purple-600 text-white">{template.category}</Badge>
      </div>

      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">
            {template.name}
          </CardTitle>
          <span className="text-lg font-bold text-purple-600">{template.price}</span>
        </div>

        {template.description && (
          <p className="text-sm text-gray-600 mb-3">{template.description}</p>
        )}

        {template.rating && template.downloads && (
          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span>{template.rating}</span>
            </div>
            <span>{template.downloads} downloads</span>
          </div>
        )}

        <div className="space-y-1 mb-4">
          {template.features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-center text-sm text-gray-600">
              <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
              {feature}
            </div>
          ))}
          {template.features.length > 3 && (
            <div className="text-sm text-purple-600">
              +{template.features.length - 3} more features
            </div>
          )}
        </div>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 hover:bg-purple-50 hover:border-purple-300 bg-transparent"
          >
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>
          <Link to="/booking" className="flex-1">
            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 btn-hover-effect"
            >
              <Download className="h-4 w-4 mr-1" />
              Get Now
            </Button>
          </Link>
        </div>
      </CardHeader>
    </Card>
  );
}
