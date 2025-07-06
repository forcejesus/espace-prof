// Re-export individual services
export { gameService } from './gameService';
export { questionService } from './questionService';  
export { answerService } from './answerService';
export { referenceService } from './referenceService';

// Re-export all types
export * from './types';

// Create unified service for backward compatibility
import { gameService as _gameService } from './gameService';
import { questionService } from './questionService';
import { answerService } from './answerService';
import { referenceService } from './referenceService';

const unifiedGameService = Object.assign(
  Object.create(Object.getPrototypeOf(_gameService)),
  _gameService,
  questionService,
  answerService,
  referenceService
);

// Export unified service as default gameService for backward compatibility
export { unifiedGameService as gameService };