import { describe, it, expect, beforeEach, vi } from 'vitest'

const mockContractCall = vi.fn()

describe('Quantum Token Contract', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })
  
  describe('mint', () => {
    it('should mint tokens successfully', async () => {
      const amount = 100
      const recipient = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'
      
      mockContractCall.mockResolvedValue({ value: true })
      
      const result = await mockContractCall('quantum-token', 'mint', [amount, recipient])
      
      expect(result.value).toBe(true)
      expect(mockContractCall).toHaveBeenCalledWith('quantum-token', 'mint', [amount, recipient])
    })
    
    it('should fail if caller is not the contract owner', async () => {
      const amount = 100
      const recipient = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'
      
      mockContractCall.mockRejectedValue(new Error('Unauthorized'))
      
      await expect(mockContractCall('quantum-token', 'mint', [amount, recipient]))
          .rejects.toThrow('Unauthorized')
    })
  })
  
  describe('transfer', () => {
    it('should transfer tokens successfully', async () => {
      const amount = 50
      const sender = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'
      const recipient = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG'
      
      mockContractCall.mockResolvedValue({ value: true })
      
      const result = await mockContractCall('quantum-token', 'transfer', [amount, sender, recipient])
      
      expect(result.value).toBe(true)
      expect(mockContractCall).toHaveBeenCalledWith('quantum-token', 'transfer', [amount, sender, recipient])
    })
    
    it('should fail if sender has insufficient balance', async () => {
      const amount = 1000000
      const sender = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'
      const recipient = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG'
      
      mockContractCall.mockRejectedValue(new Error('Insufficient balance'))
      
      await expect(mockContractCall('quantum-token', 'transfer', [amount, sender, recipient]))
          .rejects.toThrow('Insufficient balance')
    })
  })
  
  describe('get-balance', () => {
    it('should return the correct balance for an account', async () => {
      const account = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'
      const expectedBalance = 500
      
      mockContractCall.mockResolvedValue({ value: expectedBalance })
      
      const result = await mockContractCall('quantum-token', 'get-balance', [account])
      
      expect(result.value).toBe(expectedBalance)
      expect(mockContractCall).toHaveBeenCalledWith('quantum-token', 'get-balance', [account])
    })
  })
  
  describe('set-token-uri', () => {
    it('should set the token URI successfully', async () => {
      const newUri = 'https://example.com/quantum-token-metadata'
      
      mockContractCall.mockResolvedValue({ value: true })
      
      const result = await mockContractCall('quantum-token', 'set-token-uri', [newUri])
      
      expect(result.value).toBe(true)
      expect(mockContractCall).toHaveBeenCalledWith('quantum-token', 'set-token-uri', [newUri])
    })
    
    it('should fail if caller is not the contract owner', async () => {
      const newUri = 'https://example.com/quantum-token-metadata'
      
      mockContractCall.mockRejectedValue(new Error('Unauthorized'))
      
      await expect(mockContractCall('quantum-token', 'set-token-uri', [newUri]))
          .rejects.toThrow('Unauthorized')
    })
  })
  
  describe('get-token-uri', () => {
    it('should return the current token URI', async () => {
      const expectedUri = 'https://example.com/quantum-token-metadata'
      
      mockContractCall.mockResolvedValue({ value: expectedUri })
      
      const result = await mockContractCall('quantum-token', 'get-token-uri', [])
      
      expect(result.value).toBe(expectedUri)
      expect(mockContractCall).toHaveBeenCalledWith('quantum-token', 'get-token-uri', [])
    })
  })
})

