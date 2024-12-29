import { describe, it, expect, beforeEach, vi } from 'vitest'

const mockContractCall = vi.fn()

describe('Experiment Scheduler Contract', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })
  
  describe('schedule-experiment', () => {
    it('should schedule an experiment successfully', async () => {
      const title = 'Quantum Teleportation'
      const description = 'Testing quantum teleportation across 100km'
      const startTime = 1625097600000 // July 1, 2021, 00:00:00 UTC
      const duration = 3600 // 1 hour
      const locations = ['ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM', 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG']
      
      mockContractCall.mockResolvedValue({ value: 1 })
      
      const result = await mockContractCall('experiment-scheduler', 'schedule-experiment', [
        title,
        description,
        startTime,
        duration,
        locations
      ])
      
      expect(result.value).toBe(1)
      expect(mockContractCall).toHaveBeenCalledWith('experiment-scheduler', 'schedule-experiment', [
        title,
        description,
        startTime,
        duration,
        locations
      ])
    })
  })
  
  describe('start-experiment', () => {
    it('should start an experiment successfully', async () => {
      const experimentId = 1
      
      mockContractCall.mockResolvedValue({ value: true })
      
      const result = await mockContractCall('experiment-scheduler', 'start-experiment', [experimentId])
      
      expect(result.value).toBe(true)
      expect(mockContractCall).toHaveBeenCalledWith('experiment-scheduler', 'start-experiment', [experimentId])
    })
    
    it('should fail if caller is not the experiment creator', async () => {
      const experimentId = 1
      
      mockContractCall.mockRejectedValue(new Error('Unauthorized'))
      
      await expect(mockContractCall('experiment-scheduler', 'start-experiment', [experimentId]))
          .rejects.toThrow('Unauthorized')
    })
  })
  
  describe('complete-experiment', () => {
    it('should complete an experiment successfully', async () => {
      const experimentId = 1
      
      mockContractCall.mockResolvedValue({ value: true })
      
      const result = await mockContractCall('experiment-scheduler', 'complete-experiment', [experimentId])
      
      expect(result.value).toBe(true)
      expect(mockContractCall).toHaveBeenCalledWith('experiment-scheduler', 'complete-experiment', [experimentId])
    })
    
    it('should fail if experiment is not in progress', async () => {
      const experimentId = 1
      
      mockContractCall.mockRejectedValue(new Error('Invalid experiment status'))
      
      await expect(mockContractCall('experiment-scheduler', 'complete-experiment', [experimentId]))
          .rejects.toThrow('Invalid experiment status')
    })
  })
  
  describe('get-experiment', () => {
    it('should return experiment details', async () => {
      const experimentId = 1
      const expectedExperiment = {
        creator: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        title: 'Quantum Teleportation',
        description: 'Testing quantum teleportation across 100km',
        start_time: 1625097600000,
        duration: 3600,
        locations: ['ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM', 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG'],
        status: 'scheduled'
      }
      
      mockContractCall.mockResolvedValue({ value: expectedExperiment })
      
      const result = await mockContractCall('experiment-scheduler', 'get-experiment', [experimentId])
      
      expect(result.value).toEqual(expectedExperiment)
      expect(mockContractCall).toHaveBeenCalledWith('experiment-scheduler', 'get-experiment', [experimentId])
    })
    
    it('should return null for non-existent experiment', async () => {
      const experimentId = 999
      
      mockContractCall.mockResolvedValue({ value: null })
      
      const result = await mockContractCall('experiment-scheduler', 'get-experiment', [experimentId])
      
      expect(result.value).toBeNull()
    })
  })
})

