# vgg_loss.py
import torch
import torch.nn as nn
import torchvision.models as models

class VGG16Features(nn.Module):
    def __init__(self, layer_ids=None):
        super().__init__()
        vgg = models.vgg16(pretrained=True).features
        self.layers = vgg[:23]  # up to relu4_3, adjust if needed
        for param in self.layers.parameters():
            param.requires_grad = False

    def forward(self, x):
        # returns features at different layers if needed
        features = []
        for i, layer in enumerate(self.layers):
            x = layer(x)
            # capture some layers:
            if i in {3, 8, 15, 22}:  # relu1_2, relu2_2, relu3_3, relu4_3
                features.append(x)
        return features