using System;
using System.Runtime.Serialization;

namespace Mystwood.Landing.Common
{
    [Serializable]
    public class MessagingServiceException : Exception
    {
        public MessagingServiceException()
        {
        }

        public MessagingServiceException(string? message) : base(message)
        {
        }

        public MessagingServiceException(string? message, Exception? innerException) : base(message, innerException)
        {
        }

        protected MessagingServiceException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
